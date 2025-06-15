// TODO:
const { Sequelize } = require("sequelize");

const { getDb } = require("../db/db.js");
const StatsOption = require("../dbo/StatsOption.js");
require("dotenv").config();
const tokenService = require("../services/tokenService.js");

class adminController {
  async changeUserRole(req, res, next) {
    try {
      const token = req.cookies["token"];
      const { id } = req.body;
      console.log(id);
      const userID = await getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      if (!userID) return res.status(401).json("unauthorized");
      const role = await getDb()
        .models.User.findOne({
          where: { user_id: id },
        })
        .then((user) => {
          if (user.role == "2") {
            return res.status(401).json(" admin role already");
          }
          user.role = "2";
          user.save().then(() => {
            console.log("role changed and saves");
          });
        });
      return res.status(200).json(role);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async deleteUserByAdmin(req, res, next) {
    try {
      const token = req.cookies["token"];
      const { id } = req.body;

      const userID = await getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      if (!userID) return res.status(401).json("unauthorized");
        const UserToken = await getDb().models.Token.findOne({
        where: { userID: String(id)},
      });
      const deleteAcc = await getDb().models.User.destroy({
        where: { user_id: String(id) },
      });
    

      await tokenService.removeToken(UserToken.refreshToken);

      return res.status(200);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getUserStatistics(req, res, next) {
    try {
      const token = req.cookies["token"];
      const userID = await getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      if (!userID) return res.status(401).json("unauthorized");

      const amountStat = await getDb().models.User.count();
      const stats = new StatsOption(
        "1",
        "Количество пользователей",
        amountStat
      );
      console.log(amountStat);
      console.log(stats);

      return res.json(stats).status(200);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getLanguageStatistics(req, res, next) {
    try {
      const token = req.cookies["token"];
      const userID = await getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      if (!userID) return res.status(401).json("unauthorized");

      const amountStat = await getDb().models.Language.count();
      const stats = new StatsOption("2", "Количество языков", amountStat);
      return res.json(stats).status(200);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
module.exports = new adminController();
