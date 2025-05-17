
const express = require("express");

const authRouter = require("./routes/authRouter.js");
const userRouter = require("./routes/userRouter.js");
const languageRouter = require("./routes/languageRouter.js");
const featureRouter = require('./routes/featureRouter.js')
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

server.use(limiter);

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

server.use(errorMiddleware);

const start = async () => {
  try {
    await initDb();

    server.listen(PORT, () => {
      console.log(`server is running on port  ${PORT}`);
     
    });
  } catch (e) {
    console.log(e);
  }
};
start();
