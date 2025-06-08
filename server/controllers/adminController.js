// TODO:
// контроллер для управления сайтом, смены ролей и статистики

const { getDb } = require("../db/db.js");
const StatsOption = require("../dbo/StatsOption.js");
require("dotenv").config();

class adminController {
  async changeUserRole(req, res, next) {
    try {
      const token = req.cookies["token"];
      const userID = getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      if (!userID) return res.status(401).json("unauthorized");

      const role = getDb().models.User.findOne({
        where: { user_id: userID }.then((user) => {
          if (user.role == "admin") {
            return res.status(401).json(" admin role already");
          }
          user.role = "admin";
          user.save().then(() => {
            console.log("role changed and saves");
          });
        }),
      });
      return req.json(role).status(200);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getUserStatistics(req, res,next) {
    try {
      //check auth
      const token = req.cookies["token"];
      const userID = getDb().models.Token.findOne({
        where: { refreshToken: token }.then((token) => {
          if (!token) return res.status(401).json("unauthorized");
          return token.userID;
        }),
      });
      const amount = getDb().models.User.findOne({
        where: { user_id: userID }.then((user) => {
          if (!user) return res.status(401).json("unauthorized");
          if (user.role !== "admin") {
            return res.status(401).json("not admin role");
          }
          return getDb().models.User.count();
        }),
      });
      const stats = new StatsOption("1", "UserStats", String(amount));
      return res.json(stats);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getLanguageStatistics(req, res, next) {
    try {
      const token = req.cookies["token"];
      const userID = getDb().models.Token.findOne({
        where: { refreshToken: token }
      });
      if (!userID) return res.status(401).json("unauthorized");
      const amount = getDb().models.User.findOne({
        where: { user_id: userID }.then((user) => {
          if (!user) return res.status(401).json("unauthorized");

          return getDb().models.Language.count();
        }),
      });
      const stats = new StatsOption("1", "LangsStats", String(amount));

      return res.json(stats);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
module.exports = new adminController();
