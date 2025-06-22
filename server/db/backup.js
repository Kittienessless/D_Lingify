const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();

class BackupManager {
  constructor() {
    this.backupRoot = path.join(__dirname, "backups/backups");
    this.dbConfig = {
      user: process.env.DB_NAME,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASENAME,
      password: process.env.DB_PASSWORD_BACKUP,
      port: process.env.DB_PORT,
    };
  }

  async ensureDirectories() {
    const dirs = ["daily", "weekly", "monthly", "temp"];

    if (!fs.existsSync(this.backupRoot)) {
      fs.mkdirSync(this.backupRoot, { recursive: true });
    }

    for (const dir of dirs) {
      const dirPath = path.join(this.backupRoot, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    }
  }

  async createBackup(type = "daily") {
    await this.ensureDirectories();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupName = `backup-${timestamp}.tar`;
    const backupPath = path.join(this.backupRoot, type, backupName);

const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe"`; // укажите правильный путь

    const command = `pg_dump -U backup_user -h ${this.dbConfig.host} -p ${this.dbConfig.port} -d ${this.dbConfig.database} > ${backupPath}`;

    const dumpCommand = `set PGPASSWORD=124C41+1 "C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe" -U postgres -h localhost -d Test10 > ${backupPath}`;

    // запуск команды
  return  exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при создании бэкапа: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Бэкап успешно создан: ${backupPath}`);
    });
  
  }

  async rotateBackups(type = "daily", maxCount = 30) {
    const dirPath = path.join(this.backupRoot, type);
    const files = fs
      .readdirSync(dirPath)
      .map((file) => ({
        file,
        time: fs.statSync(path.join(dirPath, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length > maxCount) {
      const toDelete = files.slice(maxCount);
      toDelete.forEach(({ file }) => {
        fs.unlinkSync(path.join(dirPath, file));
      });
    }
  }
}
module.exports = new BackupManager();
