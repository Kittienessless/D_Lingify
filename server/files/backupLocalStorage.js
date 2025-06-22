const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver'); // npm install archiver

  async function backupLocalStorage() {
  const storagePath = 'D:/Diploma/server/userStorage'; // Путь к хранилищу
  const backupDir = 'D:/Diploma/server/backups/localStorageBackUps'; // Каталог для бекапов
  const backupName = `storage-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.zip`;
  const backupPath = path.join(backupDir, backupName);

  // Создаем каталог для бекапов, если его нет
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Создаем архив
  const output = fs.createWriteStream(backupPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`Backup created: ${backupPath} (${archive.pointer()} bytes)`);
      resolve(backupPath);
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.directory(storagePath, false); // Второй параметр false - не включать корневой каталог в архив
    archive.finalize();
  });
}

 