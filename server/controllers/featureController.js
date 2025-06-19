// TODO:
// контроллер для создания перевода с новых языков, генерации текстов

const { where } = require("sequelize");
const { getDb } = require("../db/db.js");
require("dotenv").config();
const featureService = require("../services/featureService.js");
const PATH = `D:/Diploma/server/userStorage/`;
const tokenService = require("../services/tokenService.js");

const axios = require("axios");
const qs = require("qs");
const fs = require("fs");

class featureController {
  async generateTextNeural(req, res) {
    try {
      const { langID } = req.body;
      const token = req.cookies["token"];
      const lang = await getDb().models.Language.findOne({
        where: { id: langID },
      });

      if (!lang) return res.message("no lang data");

      const userToken = await tokenService.findToken(token);
      if (!userToken) return res.status(401).json("unauthorized");

      const user = await getDb().models.User.findOne({
        where: { user_id: userToken.userID },
      });
      let dataScope = qs.stringify({
        scope: "GIGACHAT_API_PERS",
      });
      console.log(lang, user, langID);

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
      let LangData;
      fs.readFile(`${lang.LangPath}`, "utf8", function (err, data) {
        if (err) throw err;
        LangData = JSON.stringify(data);
      });
      console.log(LangData);

      const tokenChat = await axios.request(configScopes);

      console.log(tokenChat);
      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content: `Ты профессиональный лингвист и писатель.  Ты можешь изучить новый язык, который тебе дадут на вход. 
             ИЗУЧИ все правила и выучи все слова, НОВЫЕ СЛОВА И ПРАВИЛА НЕ НУЖНО ДОБАВЛЯТЬ. ТЫ ДОЛЖЕН СОСТАВИТЬ ТЕКСТ НЕ БОЛЕЕ ЧЕМ НА 1000 
             СИМВОЛОВ НА ЛЮБУЮ ТЕМАТИКУ (ВЫБЕРИ РАНДОМНУЮ) С ИСПОЛЬЗОВАНИЕМ ИЗУЧЕННОГО ТОЛЬКО ЧТО ТОБОЙ ИСКУССТВЕННОГО ЯЗЫКА.
             ТЕКСТ ДОЛЖЕН БЫТЬ ОСМЫССЛЕННЫМ И ПРИ ЭТОМ ПРОСТЫМ. НЕ НУЖНО НАУЧНЫХ ТЕРМИНОВ И МАЛОИСПОЛЬЗУЕМЫХ СЛОВ.
               язык является искусственным, в нем может не доставать слов. ты  НЕ ДОЛЖЕН выходить за рамки 
             правил и словарного запаса, НЕ ДОЛЖЕН придумывать новые слова и новые правила. ты НЕ ДОЛЖЕН менять существующие слова и правила.
             ты должен использовать только те данные что тебе были даны в качестве языка для изучения. 
             не думай о том что слов очень мало, если их не хватает - вообще все слова что не найдешь в словаре замени 
             на вопросительный знак и в скобках укажи какого именно слова 
             не хватет для перевода на языке оригинала текста. НЕ НУЖНО подбирать похожие на слово слова. 
             Если например слово "большой" имеет похожее по значению слово, не нужно заменять его синонимом. НЕ НАДО ВЫВОДИТЬ ПЕРЕВОД.
             генерация должна быть МАКСИМАЛЬНО ТОЧНОЙ, НО НЕ НАДО ПОДСТРАИВАТЬ ПОД НЕГО ЯЗЫК И ВЫДУМЫВАТЬ НОВЫЕ СЛОВА И ПРАВИЛА. ПРЕДСТАВЬ ЧТО ТЫ ПЕРЕВОДИШЬ ТЕКСТ НА УЖЕ ИЗВЕСТНЫЙ ТЕБЕ ЯЗЫК И . Ответ верни в виде строки с только переводом текста, без кавычек в начале и конце строки.
             ничего лишнего не пиши. соблюдай все правила изученного языка. СОБЛЮДАЙ ВСЕ ЗНАКИ ПРЕПИНАНИЯ ЧТО ЕСТЬ В ОРИГИНАЛЕ, НО ТАК ЧТОБЫ НЕ ПРОТИВОРЕЧИТЬ ПРАВИЛАМ ЯЗЫКА. `,
          },

          {
            role: "user",
            content: `Язык который ты должен выучить: ${LangData}.`,
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
      console.log(answer);
      return res.status(200).json(answer);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "generateTextNeural by gigachat error" });
    }
  }

  async translateTextNeural(req, res) {
    try {
      const token = req.cookies["token"];
      const { text, langID } = req.body;
      console.log(text, langID);
      const lang = await getDb().models.Language.findOne({
        where: { id: langID },
      });

      if (!lang) return res.message("no lang data");

      const userToken = await tokenService.findToken(token);
      if (!userToken) return res.status(401).json("unauthorized");

      const user = await getDb().models.User.findOne({
        where: { user_id: userToken.userID },
      });
      let dataScope = qs.stringify({
        scope: "GIGACHAT_API_PERS",
      });
      console.log(lang, user, text, langID);

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
      let LangData;
      fs.readFile(`${lang.LangPath}`, "utf8", function (err, data) {
        if (err) throw err;
        LangData = JSON.stringify(data);
      });
      console.log(LangData);

      const tokenChat = await axios.request(configScopes);

      console.log(tokenChat);
      const data = JSON.stringify({
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "system",
            content: `Ты- профессиональный лингвист и переводчик. \n
            Ты можешь изучить новый язык, который тебе дадут на вход. \n
             ИЗУЧИ все правила и выучи все слова, НОВЫЕ СЛОВА И ПРАВИЛА НЕ НУЖНО ДОБАВЛЯТЬ. 
             на вход еще тебе будет дан текст, который нужно перевести на присланный 
             тебе язык. язык является искусственным, в нем может не доставать слов. ты  НЕ ДОЛЖЕН выходить за рамки 
             правил и словарного запаса, НЕ ДОЛЖЕН придумывать новые слова и новые правила чтобы перевод получился 
             хорошим. ты НЕ ДОЛЖЕН менять существующие слова и правила чтобы перевод получился точным. 
             ты должен использовать только те данные что тебе были даны в качестве языка для изучения. просто сделай хороший перевод с тем количеством слов, что есть в словаре. 
             не думай о том что слов очень мало, если их не хватает - вообще все слова что не найдешь в словаре замени на вопросительный знак и в скобках укажи какого именно слова 
             е хватет для перевода на языке оригинала текста. НЕ НУЖНО подбирать похожие на слово слова. Если например слово "большой" имеет похожее по значению слово, не нужно заменять его синонимом.
              перевод ДОЛЖЕН БЫТЬ МАКСИМАЛЬНО ТОЧНЫМ, НО НЕ НАДО ПОДСТРАИВАТЬ ПОД НЕГО ЯЗЫК И ВЫДУМЫВАТЬ НОВЫЕ СЛОВА И ПРАВИЛА. ПРЕДСТАВЬ ЧТО ТЫ ПЕРЕВОДИШЬ ТЕКСТ НА УЖЕ ИЗВЕСТНЫЙ ТЕБЕ ЯЗЫК И . Ответ верни в виде строки с только переводом текста, без кавычек в начале и конце строки.
             ничего лишнего не пиши. соблюдай все правила изученного языка. СОБЛЮДАЙ ВСЕ ЗНАКИ ПРЕПИНАНИЯ ЧТО ЕСТЬ В ОРИГИНАЛЕ, НО ТАК ЧТОБЫ НЕ ПРОТИВОРЕЧИТЬ ПРАВИЛАМ ЯЗЫКА. 
             
             Пример ответа: словарь: мама - haha, папа - urdo, мыть - nere, в - ik, помогать - juro, рама - kelro, ее - ter, дочь-kasa, кровать-resso.
             "Мама мыла раму, мама мыла полы, папа ей помогал, её дочь лежала в кроватке." - 
             перевод на изученный выдуманный язык: "Haha nere kelro, haha nere ? (полы), urdo ter juro, ter kasa ? (лежала) ik resso."`,
          },

          {
            role: "user",
            content: `Язык который ты должен выучить: ${LangData}. Текст который ты должен перевести - ${text}`,
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
      console.log(answer);
      return res.status(200).json(answer);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: "translateTextNeural by gigachat error" });
    }
  }
}
module.exports = new featureController();
