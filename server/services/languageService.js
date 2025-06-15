const { getDb } = require("../db/db.js");
require("dotenv").config();
const { where } = require("sequelize");
const filesService = require("../services/filesService.js");
const PATH = `D:/Diploma/server/userStorage/`;
const LangDto = require("../dbo/lang-dto.js");
const fs = require("fs");
const axios = require("axios");

class LanguageService {
  async createLang(title, description, filePath, fileType, userID) {
    try {
    } catch (e) {}
  }
  async getAccessToken(bearer) {
    try {
      console.log("let get bearer");

      let data = qs.stringify({
        'scope': "GIGACHAT_API_PERS",
      });

      console.log("let get config");
     
      console.log(data + "let get tokenChat");

      

      return tokenChat;
    } catch (e) {}
  }
  async createNeural(title, description, filePath, fileType, userID, prompt) {
    try {
    } catch (e) {}
  }
  async getToken(userID) {
    try {
    } catch (e) {}
  }
  async getAllLangs() {
    try {
    } catch (e) {}
  }
  async getCurrentLang(langID) {
    try {
      const lang = await getDb().models.Language.findOne({
        where: { id: langID },
      });
      console.log("language ID  " + langID);
      const langDto = new LangDto(lang);

      return {
        lang: langDto,
      };
    } catch (e) {}
  }
  async updateLangInfo(title, description) {
    try {
    } catch (e) {}
  }
  async deleteLang(langID) {
    try {
    } catch (e) {}
  }
  async updateLang() {
    try {
    } catch (e) {}
  }
  async getLangPath(langID, userId) {
    try {
    } catch (e) {}
  }
}

module.exports = new LanguageService();
