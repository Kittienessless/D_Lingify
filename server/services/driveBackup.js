const { google } = require('googleapis');
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CLIENT_SECRET,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

async function uploadBackup(filePath) {
  const fileMetadata = {
    name: `backup-${Date.now()}.zip`,
    parents: ['backupLocalStorage'],
  };

  const media = {
    mimeType: 'application/zip',
    body: fs.createReadStream(filePath),
  };

  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  console.log('Backup uploaded to Google Drive. File ID:', res.data.id);
}

uploadBackup('./backups/my-backup.zip').catch(console.error);