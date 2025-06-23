const express = require("express");
const backupManager = require("./db/backup.js");

const authRouter = require("./routes/authRouter.js");
const userRouter = require("./routes/userRouter.js");
const languageRouter = require("./routes/languageRouter.js");
const featureRouter = require("./routes/featureRouter.js");
const adminRouter = require("./routes/adminRouter.js");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const { initDb } = require("./db/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const server = express();
const PORT = process.env.PORT;
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const { google } = require("googleapis");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const archiver = require("archiver");
/* 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 1,
  delayMs: () => 2000,
});
server.use(speedLimiter);

server.use(limiter); */

server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
server.use(cookies());
server.use(express.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Overwrite, Destination, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

  res.header("Access-Control-Max-Age", 86400);
  next();
});
server.use("/auth", authRouter);
server.use("/user", userRouter);
server.use("/lang", languageRouter);
server.use("/feature", featureRouter);
server.use("/admin", adminRouter);

server.use(errorMiddleware);

async function dailyBackup() {
  try {
    const backupPath = await backupManager.createBackup("daily");
    console.log(`Backup sql created: ${backupPath}`);
    await backupManager.rotateBackups("daily");
  } catch (error) {
    console.error("Backup failed:", error);
  }
}

async function backupLocalStorage() {
  const storagePath = "D:/Diploma/server/userStorage"; // Путь к хранилищу
  const backupDir = "D:/Diploma/server/backups/localStorageBackUps"; // Каталог для бекапов
  const backupName = `storage-backup-${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}.zip`;
  const backupPath = path.join(backupDir, backupName);

  // Создаем каталог для бекапов, если его нет
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Создаем архив
  const output = fs.createWriteStream(backupPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log(
        `Backup  created: ${backupPath} (${archive.pointer()} bytes)`
      );
      resolve(backupPath);
    });

    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(storagePath, false); // Второй параметр false - не включать корневой каталог в архив
    archive.finalize();
  });
}

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CLIENT_SECRET,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// Ротация логов (новый файл каждый день)
const logDirectory = path.join(__dirname, "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
});

// Логирование в файл и консоль (только для ошибок)
server.use(morgan("combined", { stream: accessLogStream }));
server.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode < 400, // только ошибки в консоль
  })
);
async function dailyBackupStorage() {
  try {
    backupLocalStorage()
      .then((backupPath) =>
        console.log("Backup storage successful:", backupPath)
      )
      .catch((err) => console.error("Backup failed:", err));
  } catch (error) {
    console.error("Backup Storage failed:", error);
  }
}
const start = async () => {
  try {
    await initDb();
    /*  await dailyBackup();
    
    await dailyBackupStorage(); */
    server.listen(PORT, () => {
      console.log(`server is running on port  ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
