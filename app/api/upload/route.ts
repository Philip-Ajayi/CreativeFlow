import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import clientPromise from '@/lib/mongodb';

const PARENT_FOLDER_ID = '1y9MngJySG7SwjG_J3TaMnj-GV9lBCHHA';

// Define explicit type for uploaded file objects
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
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const folderName = (formData.get('folderName') as string) || `Folder_${Date.now()}`;
    const userEmail = (formData.get('userEmail') as string) || '';
    const description = (formData.get('description') as string) || '';
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const drive = getDriveClient();

    // Create new folder inside target Google Drive directory
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [PARENT_FOLDER_ID],
    };

    const createdFolder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id, name, webViewLink',
    });

    const newFolderId = createdFolder.data.id;
    if (!newFolderId) {
      throw new Error('Failed to create folder in Google Drive');
    }

    // Explicitly annotate array type to avoid TS2345 (never[] error)
    const uploadedFilesData: UploadedFileData[] = [];

    for (const file of files) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];

      if (!allowedTypes.includes(file.type)) {
        console.warn(`Skipping file with unsupported MIME type: ${file.type}`);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = Readable.from(buffer);

      const fileMetadata = {
        name: file.name,
        parents: [newFolderId],
      };

      const media = {
        mimeType: file.type,
        body: stream,
      };

      const uploadedFile = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
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

    // Save record to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('uploads');

    const record = {
      folderName,
      googleDriveFolderId: newFolderId,
      googleDriveFolderUrl: createdFolder.data.webViewLink,
      userEmail,
      description,
      files: uploadedFilesData,
      createdAt: new Date(),
    };

    const dbResult = await collection.insertOne(record);

    return NextResponse.json(
      {
        message: 'Folder created, files uploaded, and record saved successfully.',
        data: {
          mongoId: dbResult.insertedId,
          ...record,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}