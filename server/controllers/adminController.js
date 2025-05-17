// TODO:
// контроллер для управления сайтом, смены ролей и статистики

const { getDb } = require("../db/db.js");
require("dotenv").config();

class adminController {
  /// 
  ///
  ///
  ///
  ///
  async changeUserRole(req, res, next) {
    try {
      const { token } = req.cookies;
      const userID = getDb().models.Token.findOne({
        where: { refreshToken: token }.then((token) => {
          if (!token) return res.status(401).json("unauthorized");
          return token.userID;
        }),
      });
      const role = getDb().models.User.findOne({
        where: { user_id: userID }.then((user) => {
          if (!user) return res.status(401).json("unauthorized");
          if (user.role !== 'admin') {
            return res.status(401).json("not admin role");
          }
          user.role = 'admin';
          user.save().then(()=>{
            console.log('role changed and saves')
          })
        }),
      });
       return req.json(role).status(200);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getUserStatistics(req, res) {
    try {
      //check auth
      const { token } = req.cookies;
      const userID = getDb().models.Token.findOne({
        where: { refreshToken: token }.then((token) => {
          if (!token) return res.status(401).json("unauthorized");
          return token.userID;
        }),
      });
      const amount = getDb().models.User.findOne({
        where: { user_id: userID }.then((user) => {
          if (!user) return res.status(401).json("unauthorized");
          if (user.role !== 'admin') {
            return res.status(401).json("not admin role");
          }
         return getDb().models.User.count();
        }),
      });
       return res.json(amount);
    } catch (e) {}
  }

  async getLanguageStatistics(req, res) {
    try {
      const { token } = req.cookies;
      const userID = getDb().models.Token.findOne({
        where: { refreshToken: token }.then((token) => {
          if (!token) return res.status(401).json("unauthorized");
          return token.userID;
        }),
      });
      const amount = getDb().models.User.findOne({
        where: { user_id: userID }.then((user) => {
          if (!user) return res.status(401).json("unauthorized");
          if (user.role !== 'admin') {
            return res.status(401).json("not admin role");
          }
         return getDb().models.Language.count();
        }),
      });
       return res.json(amount);
    } catch (e) {}
  }
}
module.exports = new adminController();
