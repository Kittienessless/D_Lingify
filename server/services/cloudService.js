const { getDb } = require("../db/db.js");
require("dotenv").config();
const axios = require("axios");
const filesService = require("./filesService.js");
require("dotenv").config();
const ApiError = require("../exceptions/api-error.js");
let EasyYandexS3 = require("easy-yandex-s3").default;

let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.ACCESS_KEY_ID_CLOUD,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_CLOUD,
  },
  Bucket: "НАЗВАНИЕ_БАКЕТА", 
  debug: false, 
});

class cloudService {
  async uploadFile(buffer) {
    try {
      const upload = await s3.Upload({ buffer }, "/files/");
      return upload;
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest(e + "uploadFile cloud error");
    }
  }

  async saveFile() {
    try {
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest(e + "saveFile cloud error");
    }
  }

  async getDirectoryList() {
    try {
      const list = await s3.GetList();
      return list;
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest(e + "getDirectoryList cloud error");
    }
  }
}
module.exports = new cloudService();
