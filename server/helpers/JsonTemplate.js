const { getDb } = require("../db/db.js");
require("dotenv").config();
const PATH = `D:/Diploma/server/userStorage/`;
const fs = require("fs");

 
class JsonTemplate {
  async CreateFileByTemplate(Array) {
    try {
      let fs = require('fs');
    let base = require('D:/Diploma/server/config/template.json');
    let result = [];
    for (let i = 0; i < Array.Length; i++) {
      let obj = JSON.parse(JSON.stringify(base));  // or your preferred way of deep copying
      obj.Title = Array.Title;
      obj.Desc = Array.Desc;
      obj.Vocabulary = Array.Vocabulary;
      obj.Rules.noun = Array.Rules.noun;
      obj.Rules.verb = Array.Rules.verb;
      obj.Rules.pronoun = Array.Rules.pronoun;
      obj.Rules.adjective = Array.Rules.adjective;
      obj.Rules.adverb = Array.Rules.adverb;
      obj.Rules.conjunction = Array.Rules.conjunction;
      obj.Rules.interjection = Array.Rules.interjection;
      obj.Articles = Array.Articles;
      obj.NounGender = Array.NounGender;
      obj.DegreesOfComparison = Array.DegreesOfComparison;
      result.push(obj);
    }

    return result;
    } catch (e) {
      console.log(e);
      
     }
  }
}
module.exports = new JsonTemplate();
