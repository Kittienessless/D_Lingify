const { getDb } = require("../db/db.js");
require("dotenv").config();
const { checkAuth } = require("../modules/user.js");
const uuid = require("uuid");
const axios = require("axios");
const qs = require("qs");
const { where, json } = require("sequelize");
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
const LangDto = require("../dbo/lang-dto.js");

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
      const data = JSON.stringify({
  "Title": "${Title}",
  "Desc": "${Description}",
  "vocabular": [
    {
      "key": "1",
      "word": "",
      "translate": "",
      "stress": "",
      "property": "",
      "IPA": ""
    }
  ],
  "rules": {
    "noun": [
      {
        "key": "1",
        "rule": "rule 1"
      }
    ],
    "verb": [
      {
        "key": "1",
        "rule": "rule 1"
      }
    ],
    "pronoun": [
      {
        "key": "1",
        "rule": "rule"
      },
      {
        "key": "1",
        "rule": "rule 1"
      }
    ],
    "adjective": [
      {
        "key": "1",
        "rule": "rule 1"
      }
    ],
    "adverb": [
      {
        "key": "1",
        "rule": "rule"
      }
    ],
    "conjunction": [
      {
        "key": "1",
        "rule": "rule 1"
      }
    ],
    "interjection": [
      {
        "key": "1",
        "rule": "rule 1"
      }
    ]
  },
  "articles": [
    {
      "key": "1",
      "rule": "rule 1"
    }
  ],
  "nounGender": [
    {
      "key": "1",
      "rule": "" // Можно добавить правило или оставить пустым
    }
  ],
  "DegreesofComparison" : [
    {
      "key":"1",
      "rule":""
    }
  ]
});
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
      console.log(
        "получить запрос title и тд " + Prompt,
        Title,
        Description,
        rules
      );

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
          RqUID: user.bearer,
          Authorization: `Basic ${process.env.GIGACHAT_AUTH_KEY}`,
        },

        data: dataScope,
      };

      const tokenChat = await axios.request(configScopes);

      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content: `Роль: Ты – профессиональный лингвист и филолог и занимаешься 
            созданием новых языков под заказ для писателей, других лингвистов и просто разных пользователей. Задача: 
            Создать новый язык по заданным параметрам, каждое слово должно иметь свой перевод, ударение и должно соответствовать общей модели языка. 
            Инструкции: 1. Внимательно прочитай оригинальное сообщение. В сообщении в виде сроки содержится описание языка и возможный контекст. Далее - параметры создания в виде объекта,
             учитывай все заданные параметры. если допустим есть данные о количестве слов- создавай столько сколько нужно. 
            2. Определите контекст, заданные параметры для языка. 
            3. Создай вокабулярий с переводом на русский и правила для языка, включая правила грамматики и синтаксиса по заданным параметрам. 
            Количество слов так же по заданным параметрам. если контекст позволяет, ты должен создать как минимумм 50 слов, 
            это должны быть самые используемые слова в русском языке
            ( напрмер, я
              ты
              он
              она
              оно
              мы
              вы
              они
              этот
              тот
              что
              кто
где
когда
как
почему
потому что
и
а
но
или
если
чтобы
был/была/было (быть)
есть (есть)
не (нет)
да
нет
мой/моя/мое (мой)
твой/твоя/твоё (твой)
его (его)
её (её)
наш/наша/наше (наш)
ваш/ваша/ваше (ваш)
кто-то (кто-то)
что-то (что-то)
всё (все, всё)
ничего (ничего)
там (там)
здесь (здесь)
тама́нтри́я (там, тама́нтри́я — нечасто, можно пропустить)
один/одна/одно (один)
два, три, четыре, пять, шесть, семь, восемь, девять, десять
человек
день
время
год
рука
глаз
дом
город
работа
жизнь
место
слово
дело
вопрос
ответ
друг
семья
61 . мама
62 . папа
63 . ребенок
64 . мальчик
65 . девочка
66 . мужчина
67 . женщина
68 . деньгий
69 . вода
70 . еда
71 . машина
72 . дом
73 . город
74 . страна
75 . мир
76 . солнце
77 . небо
78 . земля
79 . море
80 . лес
81 . гора
82 . река
83 . цветок
84 . дерево
85 . птица
86 . собака
87 . кот
88 . человек
89 . хорошо
90 . плохо
91 . большой
92 . маленький
93 . новый
94 . старый
95 . красивый
96 . грустный
97 . радостный
98 . интересный
99 . скучный
100 хорошее)
            4. При необходимости можно брать слова из другого языка, только немного измени их - 
            измени ударение, некоторые буквы, но так, чтобы он был в общей тематике создаваемого языка. 
            5. Следи за тем, чтобы не было слов-повторений, если это не заложено в заданных параметрах. 
            6. Список слов не должен содержать не только приведенный список часто используемых слов, но и другие слова, если позволяет присланный тебе запрос. слова должны вписываться в контекст описания. 
            неэтичные слова и словесные конструкции, маты и ругательства.  
            Формат ответа: Отправляй ответ в формате json в виде ключ-значение, как для слов так и для правил.
             Сделай правильную структуру языка, раздели их на существительные - глаголы и другие части речи, отсортируй слова в алфавитном порядке, а 
             правила в порядке сложности и каждое правило должно соответствовать своему месту 
            (к примеру, правила для существительных в группе правил для существительных). 
            Все слова должны быть написаны латиницей с помощью правил IPA. Примерная схема выходных данных - { "Title" : "" ,
  "Desc" : "", "vocabular": [{key: "", "word": "", "translate": "", "stress" :"", "property" : "", "IPA" : ""}],
  "rules" :  {"noun": [{key: "", "rule" : "rule 1"}, {key: "","rule" : "rule 2"}], "verb" : [{key: "","rule": "rule 1"}], "pronoun" : 
      [{key: "","rule": "rule rule"}, {key: "","rule": "rule 1"}],  "adjective" : [{key: "","rule": "rule 1"}, {key: "","rule": "rule 1"}], "adverb" : 
          [{key: "","rule": "rule rule"} ], "conjunction" : [{key: "", "rule": "rule 1"}],
   "interjection" : [{key: "","rule": "rule 1"}],
  },"articles" : [{key: "","rule": "rule 1"}],"nounGender" : [{key: "","rule": "rule 1"}],"DegreesofComparison"  : [{key: "","rule": "rule 1"}] }
    Пример: Слово на выдуманном языке: Naranha . Перевод: Зарево. Свойства: существительное, ударение на вторую гласную, 
    h произносится с придыханием, либо никак не произносится. мн. число - Naranhener (зарева), падежи как в русском языке, 
    Naranha, naranher, naranhane, naranheter, naransetor, en a naranhester.  Примечание: Если будут сложности с созданием слов, 
    можно использовать части слов или слова других языков, но объем таких слов не должен превышать 30% от объема всего вокабуляра.";`,
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
      const chatResult = await axios.request(config);

      const answerContent = chatResult.data.choices[0].message.content;

      const path = PATH + uuid.v4() + ".json";

      const result = await getDb().models.Language.create({
        Title: Title,
        userID: user.user_id,
        Description: Description,
        LangPath: path,
      });

      fs.writeFile(
        `${path}`,
        JSON.stringify(answerContent),
        "utf8",
        function (err) {
          if (err) throw err;
          console.log("complete");
        }
      );
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
            res.json(JSON.parse(data));
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

  async changeTitle(req, res) {
    try {
      const token = req.cookies["token"];
      const { Title } = req.body;
      const id = req.params.id;
      console.log(id);
      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const user = await tokenService.findToken(token);
      if (!user) return res.json("unauthorized").status(401);

      const language = await getDb()
        .models.Language.findOne({
          where: { id: id },
        })
        .then((lang) => {
          lang.Title = Title;
          lang.save();
          console.log("saved");
        });
      const langData = await languageService.getCurrentLang(id);

      return res.status(200).json(langData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "gel all langs title error" });
    }
  }
  async changeDesc(req, res) {
    try {
      const token = req.cookies["token"];
      const { Description } = req.body;
      const id = req.params.id;

      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const user = await tokenService.findToken(token);
      if (!user) return res.json("unauthorized").status(401);

      const language = await getDb()
        .models.Language.findOne({
          where: { id: id },
        })
        .then((lang) => {
          lang.Description = Description;
          lang.save();
          console.log("saved");
        });
      const langData = await languageService.getCurrentLang(id);

      return res.status(200).json(langData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "gel all langs title error" });
    }
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

  async SaveAllChangesRules(req, res) {
    try {
      const token = req.cookies["token"];
      const id = req.params.id;
      const { arg0 } = req.body;
      const isFind = await tokenService.findToken(token);
      if (!isFind) return res.json("unauthorized").status(401);

      const langData = await languageService.getCurrentLang(id);
      fs.readFile(
        langData.lang.LangPath,
        { encoding: "utf-8" },
        (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read file" });
          }
          // Проверяем и парсим, если нужно
          let fileObject = {};
          if (typeof data === "string") {
            try {
              fileObject = JSON.parse(data);
            } catch (err) {
              console.error("Ошибка парсинга JSON:", err);
              // Обработка ошибки
            }
          } else {
            fileObject = data; // если уже объект
          }

          Object.keys(arg0).forEach((key) => {
            if (typeof arg0[key] !== "undefined") {
              fileObject.rules.noun = arg0.rules.noun;
            }
          });
          fs.writeFile(
            langData.lang.LangPath,
            JSON.stringify(fileObject, null, 2), // красиво форматируем для удобства
            "utf8",
            (writeErr) => {
              if (writeErr) {
                console.error("Ошибка записи файла:", writeErr);
                return res.status(500).json({ error: "Failed to write file" });
              }
              console.log("Файл успешно обновлен");
             }
          );
        }
      );

      fs.readFile(
        langData.lang.LangPath,
        { encoding: "utf-8" },
        function (err, data) {
          if (!err) {
            res.json(JSON.parse(data));
          } else {
            console.log(err);
          }
        }
      );
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "gel all langs title error" });
    }
  }
}
module.exports = new languageController();
