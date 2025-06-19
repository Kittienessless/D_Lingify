
const { getDb } = require("../db/db.js");
require("dotenv").config();
const axios = require("axios");
const filesService = require("./filesService.js");
require("dotenv").config();
const FormData = require("form-data");
const ApiError = require("../exceptions/api-error.js");

class featureService {
  async generateTextNeural(bearer, path) {
    try {
   //todo: заменить строку
   //    const contentData = filesService.readJsonFile(path);

   //todo: написать системный промпт
      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content: "",
          },
          {
            role: "user",
            content: JSON.stringify(contentData),
          },
        ],
        stream: false,
        update_interval: 0,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${bearer}`,
        },
        data: data,
      };

      const chatResult = await axios
        .request(config)
        .then((response) => {
          return JSON.stringify(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return chatResult;
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest(e + "generate text error");
    }
  }

  async translateTextNeural(text, path, bearer) {
    try {
      const contentData = filesService.readJsonFile(path);
      /*  let dataLanguage = new FormData();
      dataLanguage.append('purpose', 'general');
 */
      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content: "",
          },
          {
            role: "user",
            content: `${text}`,
          },
          {
            role: "user",
            content: JSON.stringify(contentData),
          },
        ],
        stream: false,
        update_interval: 0,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${bearer}`,
        },
        data: data,
      };

      const chatResult = await axios
        .request(config)
        .then((response) => {
          return JSON.stringify(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return chatResult;
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest(e + "translation feature service error");
    }
  }
}
module.exports = new featureService();
