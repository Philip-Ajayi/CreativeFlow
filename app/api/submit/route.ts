import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);
const PARENT_FOLDER_ID = process.env.PARENT_FOLDER_ID || '1y9MngJySG7SwjG_J3TaMnj-GV9lBCHHA';

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  return google.drive({ version: 'v3', auth });
}

/**
 * Generates a folder name formatted as YYYY-MM-DD_HH-mm-ss
 * and increments counter (e.g. YYYY-MM-DD_HH-mm-ss 2) if folder already exists.
 */
async function getUniqueFolderName(drive: ReturnType<typeof google.drive>, parentId: string) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-mm-ss
  const baseName = `${dateStr}_${timeStr}`;

  let folderName = baseName;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await drive.files.list({
      q: `'${parentId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    if (existing.data.files && existing.data.files.length > 0) {
      counter++;
      folderName = `${baseName} ${counter}`;
    } else {
      isUnique = true;
    }
  }

  return folderName;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const category = (formData.get('category') as string) || '';
    const title = (formData.get('title') as string) || 'Untitled';
    const bio = (formData.get('bio') as string) || '';
    const simultaneous = formData.get('simultaneous') === 'true';
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No manuscript file uploaded' }, { status: 400 });
    }

    const drive = getDriveClient();

    // 1. Get unique folder name (date & time first, with counter increment for duplicates)
    const folderName = await getUniqueFolderName(drive, PARENT_FOLDER_ID);

    // 2. Create the target folder in Google Drive
    const createdFolder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [PARENT_FOLDER_ID],
      },
      fields: 'id, name, webViewLink',
    });

    const folderId = createdFolder.data.id;
    if (!folderId) {
      throw new Error('Failed to create folder in Google Drive');
    }

    // 3. Convert file to stream and upload to Google Drive
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadedFile = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [folderId],
      },
      media: {
        mimeType: file.type || 'application/octet-stream',
        body: stream,
      },
      fields: 'id, name, mimeType, webViewLink, size',
    });

    const fileUrl = uploadedFile.data.webViewLink || createdFolder.data.webViewLink;

    // 4. Store submission metadata & file link in MongoDB
    const client = await clientPromise;
    const db = client.db();
    const submissionsCollection = db.collection('submissions');

    const submissionData = {
      fullName,
      email,
      category,
      title,
      bio,
      simultaneous,
      fileName: file.name,
      fileSize: file.size,
      fileUrl,
      googleDriveFolderId: folderId,
      googleDriveFolderUrl: createdFolder.data.webViewLink,
      createdAt: new Date(),
    };

    const dbResult = await submissionsCollection.insertOne(submissionData);

    // 5. Send Email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const companyEmail = process.env.COMPANY_EMAIL || 'info@freeflowcreativehub.com';

    // A. Confirmation Email to the Submitter
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Submission Confirmation: "${title}"`,
      html: `
        <h2>Thank you for your submission, ${fullName}!</h2>
        <p>We have received your piece titled <strong>"${title}"</strong> under the <strong>${category}</strong> category.</p>
        <p>Our editorial team will review your manuscript within 2–3 weeks.</p>
        <br />
        <p>Best regards,<br />The Editorial Team</p>
      `,
    });

    // B. Notification Email to Company
    await resend.emails.send({
      from: fromEmail,
      to: companyEmail,
      subject: `New Manuscript Submission: "${title}" by ${fullName}`,
      html: `
        <h2>New Submission Received</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Simultaneous Submission:</strong> ${simultaneous ? 'Yes' : 'No'}</p>
        <p><strong>Bio:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #ccc;">
          ${bio}
        </blockquote>
        <p><strong>Google Drive Access:</strong> <a href="${fileUrl}" target="_blank">View Uploaded File / Folder</a></p>
      `,
    });

    return NextResponse.json(
      {
        message: 'Submission uploaded successfully',
        submissionId: dbResult.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during submission.' },
      { status: 500 }
    );
  }
}
