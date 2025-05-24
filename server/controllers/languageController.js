const { getDb } = require("../db/db.js");
require("dotenv").config();
const { checkAuth } = require("../modules/user.js");
const uuid = require("uuid");
const axios = require("axios");
const qs = require("qs");
const { where } = require("sequelize");
const filesService = require("../services/filesService.js");
const languageService = require("../services/languageService.js");
const userService = require("../services/userService.js");
const tokenService = require("../services/tokenService.js");
const PATH = `D:/Diploma/server/userStorage/`;
const multer = require("multer");
const { Op } = require("@sequelize/core");
const fs = require("fs");
const LangsOptions = require("../dbo/langsOption.js");

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../userStorage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }); */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
class languageController {
  async createLanguage(req, res) {
    try {
      const token = req.cookies["token"];

      const isFind = tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const { title, description, file } = req.body;

      const fileName = await filesService.createJsonFile(file);

      await getDb().models.Language.create({
        Title: title,
        userID: isFind.userID,
        Description: description ? description : "",
        LangPath: fileName ? fileName : "",
      });
      return res
        .status(200)
        .json("success create lang and write file to storage");
      //res -> success
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "createLanguage error" });
    }
  }

  async getAccessToken(user_id) {
    try {
      console.log("let get bearer");
      let data = qs.stringify({
        scope: "GIGACHAT_API_PERS",
      });

      const RqUID = uuid.v4();
      console.log("let get config");
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          RqUID: RqUID,
          Authorization: `Basic ${process.env.GIGACHAT_AUTH_KEY}`,
        },
        data: data,
      };
      console.log("let get tokenChat");

      const tokenChat = await axios
        .request(config)
        .then((response) => {
          const access_token = JSON.stringify(response.data);
          return access_token;
        })
        .catch((error) => {
          console.log(error);
        });

      const userToken = await getDb()
        .models.User.findOne({ where: { user_id: user_id } })
        .then((user) => {
          if (!user.bearer) {
            user.bearer = String(tokenChat);
            user.save().then(function () {
              console.log("saved");
            });
          }
        });
      console.log(userToken + "let get userToken");

      return userToken;
    } catch (e) {
      console.log(error);
      return res.status(401).message("Нет access token ");
    }
  }

  async createLanguageNeural(req, res) {
    try {
      const token = req.cookies["token"];

      const { prompt, title, description } = req.body;
      console.log("получить запрос ");

      const userToken = await tokenService.findToken(token);
      if (!userToken) return res.status(401).json("unauthorized");

      const user = await getDb().models.User.findOne({
        where: { user_id: userToken.userID },
      });
      console.log(user, token, user.user_id);
      // const bearer = await this.getAccessToken(user.user_id);

      let dataScope = qs.stringify({
        scope: "GIGACHAT_API_PERS",
      });

      const RqUID = uuid.v4();
      console.log("let get config");

      const configScope = {
        method: "post",
        Credentials: true,
        rejectUnauthorized: (process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0),
        maxBodyLength: Infinity,
        url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          RqUID: RqUID,
          Authorization: `Basic ${process.env.GIGACHAT_AUTH_KEY}`,
        },
        data: dataScope,
      };
      console.log("let get tokenChat");

      const tokenChat = await axios
        .request(configScope)
        .then((response) => {
          const access_token = JSON.stringify(response.data.access_token);
          return access_token;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(tokenChat + " \n token chat");

      const userAccessToken = await getDb()
        .models.User.findOne({ where: { user_id: user.user_id } })
        .then(function (user) {
          user.bearer = tokenChat;
          user.save().then(function () {
            console.log("saved");
          });
        });
      console.log(userAccessToken + " \n let get userToken");

      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content:
              "Роль: Ты – профессиональный лингвист и филолог и занимаешься созданием новых языков под заказ для писателей, других лингвистов и просто разных пользователей. Задача: Создать новый язык по заданным параметрам, каждое слово должно иметь свой перевод, ударение и должно соответствовать общей модели языка. Инструкции: 1. Внимательно прочитай оригинальное сообщение. 2. Определите контекст, заданные параметры для языка. 3. Создай вокабулярий с переводом на русский и правила для языка, включая правила грамматики и синтаксиса по заданным параметрам. Количество слов так же по заданным параметрам. 4. При необходимости можно брать слова из другого языка, только немного измени их - измени ударение, некоторые буквы, но так, чтобы он был в общей тематике создаваемого языка. 5. Следи за тем, чтобы не было слов-повторений, если это не заложено в заданных параметрах. 6. Список слов не должен содержать неэтичные слова и словесные конструкции, маты и ругательства.  Формат ответа: Отправляй ответ в формате json в виде ключ-значение, как для слов так и для правил. Сделай правильную структуру языка, раздели их на существительные - глаголы и другие части речи, отсортируй слова в алфавитном порядке, а правила в порядке сложности и каждое правило должно соответствовать своему месту (к примеру, правила для существительных в группе правил для существительных). Все слова должны быть написаны латиницей с помощью правил IPA. Пример: Слово на выдуманном языке: Naranha . Перевод: Зарево. Свойства: существительное, ударение на вторую гласную, h произносится с придыханием, либо никак не произносится. мн. число - Naranhener (зарева), падежи как в русском языке, Naranha, naranher, naranhane, naranheter, naransetor, en a naranhester.  Примечание: Если будут сложности с созданием слов, можно использовать части слов или слова других языков, но объем таких слов не должен превышать 30% от объема всего вокабуляра.",
          },

          {
            role: "user",
            content: `${prompt}`,
          },
        ],
        stream: false,
        update_interval: 0,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        rejectUnauthorized: (process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0),
        url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userAccessToken.bearer}`,
        },
        data: data,
      };

      const chatResult = await axios
        .request(config)
        .then((response) => {
          JSON.stringify(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      const file = filesService.createJsonFile(chatResult);
      const result = getDb().model.Language.create({
        Title: title,
        userID: user.user_id,
        Description: description,
        LangPath: `${PATH}${String(file)}.json`,
      });

      return res.json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "createLanguage by gigachat error" });
    }
  }

  async getAllLangs(req, res) {
    try {
      const languages = await getDb().models.Language.findAll();
      return res.json(languages);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "getAllLangs error" });
    }
  }

  async getCurrentLang(req, res) {
    try {
      console.log("get into server");

      const token = req.cookies["token"];
      const id = req.params.id;

      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const langData = await languageService.getCurrentLang(id);

      return res.json(langData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "getLang error" });
    }
  }

  async updateLangInfo(req, res) {
    try {
      const { title, description } = req.body;
      const langID = req.params.id;

      const lang = getDb().models.Language.findOne({
        where: { id: langID }.then((lang) => {
          if (!lang) return res.status(400).json({ msg: "Lang not exist" });
          lang.title = title;
          lang.Description = description;
          lang.save();
        }),
      });
      return res.status(200).message("successed lang update info").json(lang);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "updateLangInfo error" });
    }
  }

  async deleteLang(req, res) {
    try {
      const token = req.cookies["token"];
      const { key } = req.body;
      const isFind = tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const lang = await getDb().models.Language.findOne({
        where: { id: key },
      });

      if (!lang) return res.status(400).json({ message: "no lang error" });

      const deleteLang = await getDb().models.Language.destroy({
        where: { id: lang.id },
      });

      return res.status(200).json({ message: "Delete success" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "deleteLang error" });
    }
  }

  async updateLang(req, res) {
    try {
      const { content } = req.body;
      const langID = req.params.id;
      const language = await getDb()
        .models.Language.findOne({ where: { id: langID } })
        .then((lang) => {
          if (!lang) return res.status(400).json({ msg: "Lang not exist" });
        });

      await filesService.appendJsonFile(language.path, content);

      const languagleFileData = await filesService.readJsonFile(
        language.LangPath
      );

      if (!languagleFileData) return res.status(400).json("no language data");

      return res.status(200).json(languagleFileData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "updateLang error" });
    }
  }

  async getFile(req, res) {
    try {
      const token = req.cookies["token"];
      const { id } = req.body;

      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);
      const langData = await languageService.getCurrentLang(id);
      fs.readFile(
        langData.lang.LangPath,
        { encoding: "utf-8" },
        function (err, data) {
          if (!err) {
            console.log("received data: " + data);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(data);
            res.end();
          } else {
            console.log(err);
          }
        }
      );
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "getFile error" });
    }
  }

  async upload(req, res) {
    const token = req.cookies["token"];
    const { file } = req.body;

    const { title } = req.body;

    const isFind = tokenService.findToken(token);
    if (!isFind) return res.json("unauthorized").status(401);

    const user = await getDb().models.User.findOne({
      where: { user_id: isFind.userID },
    });
    if (!user) return res.json("no user").status(401);

    const newFile = await filesService.createJsonFile(
      title,
      user.user_id,
      file
    );
    const fileName = String(title + isFind.userID + ".json");

    const updateLangInfo = await getDb()
      .models.Language.findOne({
        where: { [Op.and]: [{ userID: user.user_id }, { Title: title }] },
      })
      .then((lang) => {
        if (!lang.LangPath) {
          lang.LangPath = fileName;
          lang.save().then(function () {
            console.log("saved");
          });
        }
      });

    return res.status(200).json({ message: "success added to storage" });
  }

  async getAllLangsTitle(req, res) {
    try {
      const token = req.cookies["token"];

      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const languages = await getDb().models.Language.findAll();
      const result = new LangsOptions(languages);

      return res.json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "getFile error" });
    }
  }
}
module.exports = new languageController();
