// TODO:
// контроллер для создания перевода с новых языков, генерации текстов

const { where } = require("sequelize");
const { getDb } = require("../db/db.js");
require("dotenv").config();
const { checkAuth } = require("../modules/user.js");
const featureService = require("../services/featureService.js");

class featureController {
  async generateTextNeural(req, res) {
    try {
      const { langID } = req.body;

      const lang = getDb().models.Language.findOne({
        where: { id: langID }.then((lang) => {
          if (!lang) return res.json("no lang");
        }),
      });

      const generatedText = await featureService.generateTextNeural(lang.path);
      return res.status(200).json(generatedText);
    } catch (e) {
      console.log(e);
      res
      .status(400)
      .json({ message: "generateTextNeural by gigachat error" });
    }
  }

  async translateTextNeural(req, res) {
    try {
      const { text, langID } = req.body;

      const lang = getDb().models.Language.findOne({
        where: { id: langID }.then((lang) => {
          if (!lang) return res.json("no lang");
        }),
      });

      const translatedText = featureService.translateTextNeural(text, lang);
      return res.status(200).json(translatedText);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: "translateTextNeural by gigachat error" });
    }
  }
}
module.exports = new featureController();
