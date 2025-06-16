const { getDb } = require("../db/db.js");
require("dotenv").config();
const { checkAuth } = require("../modules/user.js");
const uuid = require("uuid");
const axios = require("axios");
const qs = require("qs");
const { where } = require("sequelize");
const filesService = require("../services/filesService.js");
const JsonTemplate = require("../helpers/JsonTemplate.js");
const languageService = require("../services/languageService.js");
const userService = require("../services/userService.js");
const tokenService = require("../services/tokenService.js");
const PATH = `D:/Diploma/server/userStorage/`;
const multer = require("multer");
const { Op } = require("@sequelize/core");
const fs = require("fs");
const LangsOptions = require("../dbo/langsOption.js");
const crypto = require("crypto");
const GigaChat = require("gigachat");
const chatModule = require("./chatModule.js");

class languageController {
  async createLanguage(req, res) {
    try {
      const token = req.cookies["token"];
      const { Title, Description } = req.body;

      const userToken = await tokenService.findToken(token);
      if (!userToken) return res.status(401).json("unauthorized");
      const path = PATH + uuid.v4() + ".json";
      const result = await getDb().models.Language.create({
        Title: Title,
        userID: userToken.userID,
        Description: Description,
        LangPath: path,
      });
      console.log(result);
      const data = "";
      fs.writeFile(`${path}`, data, "utf8", function (err) {
        if (err) throw err;
        console.log("complete");
      });

      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "createLanguage error" });
    }
  }

  async createLanguageNeural(req, res) {
    try {
      const token = req.cookies["token"];

      const { Prompt, Title, Description, rules } = req.body;
      console.log("получить запрос title и тд " + Prompt, Title, Description, rules);

      const userToken = await tokenService.findToken(token);
      if (!userToken) return res.status(401).json("unauthorized");

      const user = await getDb().models.User.findOne({
        where: { user_id: userToken.userID },
      });

      let dataScope = qs.stringify({
        scope: "GIGACHAT_API_PERS",
      });
      const configScopes = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          RqUID: "0120dd27-c1ea-4dc1-afcc-130e927ea299",
          Authorization:
            "Basic YzAzMTExNTktZmVmYi00MTk0LWE3YzgtNTU1MDJmMzZjN2E3OmFkMGNmYjhhLTc3NjAtNDhhMy1iNDA4LWI2NzgwM2YwYTk2YQ==",
        },

        data: dataScope,
      };

      const tokenChat = await axios.request(configScopes);

      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content: `Роль: Ты – профессиональный лингвист и филолог и занимаешься созданием новых языков под заказ для писателей, других лингвистов и просто разных пользователей. Задача: Создать новый язык по заданным параметрам, каждое слово должно иметь свой перевод, ударение и должно соответствовать общей модели языка. Инструкции: 1. Внимательно прочитай оригинальное сообщение. 2. Определите контекст, заданные параметры для языка. 3. Создай вокабулярий с переводом на русский и правила для языка, включая правила грамматики и синтаксиса по заданным параметрам. Количество слов так же по заданным параметрам. 4. При необходимости можно брать слова из другого языка, только немного измени их - измени ударение, некоторые буквы, но так, чтобы он был в общей тематике создаваемого языка. 5. Следи за тем, чтобы не было слов-повторений, если это не заложено в заданных параметрах. 6. Список слов не должен содержать неэтичные слова и словесные конструкции, маты и ругательства.  Формат ответа: Отправляй ответ в формате json в виде ключ-значение, как для слов так и для правил. Сделай правильную структуру языка, раздели их на существительные - глаголы и другие части речи, отсортируй слова в алфавитном порядке, а правила в порядке сложности и каждое правило должно соответствовать своему месту (к примеру, правила для существительных в группе правил для существительных). Все слова должны быть написаны латиницей с помощью правил IPA. Примерная схема выходных данных - { "Title" : "111" ,
  "Desc" : "111 Desc", "vocabular": [{"word": "aaa", "translate": "bbb", "stress" :"aAa"}, {"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"}],
  "rules" :  {"noun": [{"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}], "verb" : [{"rule verb": "rule 1"}, {"rule verb": "rule 1"}, {"rule verb": "rule 1"}, {"rule verb": "rule 1"}, {"rule verb": "rule 1"}], "pronoun" : [{"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}],  "adjective" : [{"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}], "adverb" : [{"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}], "conjunction" : [{"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}],
   "interjection" : [{"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}],
  },"articles" : [{"rule": "aaa"}, {"rule": "aaa"}, {"rule": "aaa"},],"nounGender" : [{"rule": "aaa"}, {"rule": "aaa"}, {"rule": "aaa"},],"DegreesofComparison"  : [{"rule": "aaa"}, {"rule": "aaa"}, {"rule": "aaa"}}, ] Пример: Слово на выдуманном языке: Naranha . Перевод: Зарево. Свойства: существительное, ударение на вторую гласную, h произносится с придыханием, либо никак не произносится. мн. число - Naranhener (зарева), падежи как в русском языке, Naranha, naranher, naranhane, naranheter, naransetor, en a naranhester.  Примечание: Если будут сложности с созданием слов, можно использовать части слов или слова других языков, но объем таких слов не должен превышать 30% от объема всего вокабуляра.";`,
          },

          {
            role: "user",
            content: `Описание языка: ${Prompt}, дополнительные правила ${rules}`,
          },
        ],
      });

      const config = {
        method: "POST",
        credentials: true,
        maxBodyLength: Infinity,
        rejectUnauthorized: (process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0),
        url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokenChat.data.access_token}`,
        },
        data: data,
      };
      let answer;
      const chatResult = await axios
        .request(config)
        .then((response) => {
          console.log("data answer" + JSON.stringify(response.data));
          answer = JSON.stringify(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      const path = PATH + uuid.v4() + ".json";

      const result = await getDb().models.Language.create({
        Title: Title,
        userID: user.user_id,
        Description: Description,
        LangPath: path,
      });
       
 
      console.log(answer);
      fs.writeFile(`${path}`, JSON.stringify(answer), "utf8", function (err) {
        if (err) throw err;
        console.log("complete");
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
            res.writeHead(200, { "Content-Type": "application/json" });
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

  async downloadFile(req, res) {
    try {
      const token = req.cookies["token"];
      const isFind = tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);
      const { id } = req.body;
      const langData = await languageService.getCurrentLang(id);

      fs.readFile(
        langData.lang.LangPath,
        { encoding: "utf-8" },
        function (err, data) {
          if (!err) {
            console.log("received data: " + data);
            res.send(data);
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
    const { id, data } = req.body;

    const isFind = await tokenService.findToken(token);
    if (!isFind) return res.json("unauthorized").status(401);

    const updateLangInfo = await getDb().models.Language.findOne({
      where: id,
    });

    // const newData = await JsonTemplate.CreateFileByTemplate(data);

    /*  fs.appendFile(`${updateLangInfo.LangPath}`, JSON.stringify(data), "utf8", function (err) {
      if (err) throw err;
      console.log("complete");
    }); */

    return res.status(200).json({ message: "success added to storage" });
  }

  async getAllLangsTitle(req, res) {
    try {
      const token = req.cookies["token"];

      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const user = await tokenService.findToken(token);
      if (!user) return res.json("unauthorized").status(401);

      const languages = await getDb().models.Language.findAll({
        where: { userID: user.userID },
      });

      let result = new LangsOptions();
      result = [];
      result = languages.map((language) => ({
        id: language.id,
        label: language.Title,
        value: language.Title,
      }));
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "gel all langs title error" });
    }
  }
}
module.exports = new languageController();
