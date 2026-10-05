import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

const PARENT_FOLDER_ID = process.env.PARENT_FOLDER_ID || '1y9MngJySG7SwjG_J3TaMnj-GV9lBCHHA';
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'company@company.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

const resend = new Resend(process.env.RESEND_API_KEY);

interface UploadedFileData {
  fileId?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
  webViewLink?: string | null;
  size?: string | null;
}

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

function formatDatePrefix(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

async function getUniqueFolderName(
  drive: any,
  parentId: string,
  baseName: string
): Promise<string> {
  let folderName = baseName;
  let counter = 1;

  while (true) {
    const escapedName = folderName.replace(/'/g, "\\'");
    const res = await drive.files.list({
      q: `'${parentId}' in parents and name = '${escapedName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    if (!res.data.files || res.data.files.length === 0) {
      return folderName;
    }

    counter++;
    folderName = `${counter}_${baseName}`;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const location = (formData.get('location') as string) || '';
    const referralSource = (formData.get('referralSource') as string) || '';
    const workingTitle = (formData.get('workingTitle') as string) || '';
    const genre = (formData.get('genre') as string) || '';
    const oneLineDescription = (formData.get('oneLineDescription') as string) || '';
    const manuscriptStage = (formData.get('manuscriptStage') as string) || '';
    const wordOrPageCount = (formData.get('wordOrPageCount') as string) || '';
    const targetTimeline = (formData.get('targetTimeline') as string) || '';
    const anythingElse = (formData.get('anythingElse') as string) || '';

    const servicesRaw = formData.get('services') as string;
    let services: string[] = [];
    if (servicesRaw) {
      try {
        services = JSON.parse(servicesRaw);
      } catch {
        services = [servicesRaw];
      }
    }

    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;
    const allFiles: File[] = files.length > 0 ? files : singleFile ? [singleFile] : [];

    const drive = getDriveClient();
    const now = new Date();
    const dateTimePrefix = formatDatePrefix(now);
    const sanitizedName = fullName.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    const baseFolderName = `${dateTimePrefix}_${sanitizedName || 'Submission'}`;

    const uniqueFolderName = await getUniqueFolderName(drive, PARENT_FOLDER_ID, baseFolderName);

    const folderMetadata = {
      name: uniqueFolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [PARENT_FOLDER_ID],
    };

    const createdFolder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id, name, webViewLink',
    });

    const newFolderId = createdFolder.data.id;
    const driveFolderUrl = createdFolder.data.webViewLink || '';

    if (!newFolderId) {
      throw new Error('Failed to create folder in Google Drive');
    }

    const uploadedFilesData: UploadedFileData[] = [];

    for (const file of allFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        const fileMetadata = {
          name: file.name,
          parents: [newFolderId],
        };

        const media = {
          mimeType: file.type || 'application/octet-stream',
          body: stream,
        };

        const uploadedFile = await drive.files.create({
          requestBody: fileMetadata,
          media,
          fields: 'id, name, mimeType, webViewLink, size',
        });

        uploadedFilesData.push({
          fileId: uploadedFile.data.id,
          fileName: uploadedFile.data.name,
          mimeType: uploadedFile.data.mimeType,
          webViewLink: uploadedFile.data.webViewLink,
          size: uploadedFile.data.size,
        });
      }
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('submissions');

    const record = {
      fullName,
      email,
      phone,
      location,
      referralSource,
      workingTitle,
      genre,
      oneLineDescription,
      manuscriptStage,
      wordOrPageCount,
      services,
      targetTimeline,
      anythingElse,
      googleDriveFolderName: uniqueFolderName,
      googleDriveFolderId: newFolderId,
      googleDriveFolderUrl: driveFolderUrl,
      files: uploadedFilesData,
      createdAt: now,
    };

    const dbResult = await collection.insertOne(record);

    if (email) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Submission Received: "${workingTitle}"`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
            <h2>Thank you for your submission, ${fullName}!</h2>
            <p>We have received your manuscript details for <strong>"${workingTitle}"</strong>.</p>
            <p>Our publishing team will review your submission and reach out within a few business days.</p>
            <br />
            <p>Best regards,<br />The Publishing Team</p>
          </div>
        `,
      });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: COMPANY_EMAIL,
      subject: `New Submission: ${workingTitle} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2>New Manuscript Submission</h2>
          <table style="width: 100%; border-collapse: collapse; max-w: 600px;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${fullName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${location}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Referral Source:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${referralSource || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Working Title:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${workingTitle}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Genre:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${genre}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Description:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${oneLineDescription}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Stage:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${manuscriptStage}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Word/Page Count:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${wordOrPageCount}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Services:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${services.join(', ') || 'None selected'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Target Timeline:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${targetTimeline || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Anything Else:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${anythingElse || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Google Drive Folder:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="${driveFolderUrl}">${driveFolderUrl}</a></td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: 'Submission successfully recorded and emails sent.',
        data: {
          id: dbResult.insertedId,
          ...record,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Publish Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}