const { getDb } = require("../db/db.js");
require("dotenv").config();
const ApiError = require("../exceptions/api-error.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const saltRounds = 5;
const mailService = require("../services/mailService.js");
const userService = require("../services/userService.js");
const tokenService = require("../services/tokenService.js");
const UserDto = require("../dbo/user-dto.js");
const COOKIE_NAME = "token";
const COOKIE_ROLE = "role";
const uuid = require("uuid");

class userController {
  async getUsers(req, res) {
    try {
      const users = await getDb().models.User.findAll();
      return res.json(users);
    } catch (e) {
      res.status(400).json({ message: "get users error" });
    }
  }

  async resetPwdUserByPK(req, res, next) {
    try {
      const token = req.cookies["token"];
      const { email } = req.body;

      const userToken = await tokenService.findToken(token);
      if (userToken) {
        await userService.logout(token);
      }

      const user = await getDb().models.User.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new Error("User does not exist");
      }
      const resetPwd = await userService.ResetPassword(user.resetLink);

      return res.json(resetPwd);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async reset(req, res, next) {
    try {
      const reset = req.params.link;
      await userService.GetResetLink(reset);
      return res.redirect(`${process.env.CLIENT_URL}#/Auth/recoverNewPassword`);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async GetNewPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;
      await userService.reset(email, newPassword);
      return res.redirect(`${process.env.CLIENT_URL}#/Auth`);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async DeleteUserByPK(req, res) {
    console.log("delete function");
    const token = req.cookies["token"];

    const userToken = await tokenService.findToken(token);
    if (!userToken) return res.status(401).json("unauthorized");
    console.log(userToken.userID + "userToken function");

    const userData = await getDb().models.User.findOne({
      where: { user_id: userToken.userID },
    });

    console.log(userData + "find db function");

    const deleteAcc = await getDb().models.User.destroy({
      where: { user_id: userData.user_id },
    });
    console.log(deleteAcc + "deleteAcc function");
    await tokenService.removeToken(token);

    res.clearCookie(COOKIE_NAME);
    res.clearCookie(COOKIE_ROLE);
    return res.status(200).json({ message: "Delete success" });
  }

  async getAllLangsByUser(req, res) {
    try {
      const token = req.cookies["token"];

      const userID = await getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      if (!userID) return res.status(401).json("unauthorized");

      const allLangs = await getDb().models.Language.findAll({
        where: { userID: userID.userID },
      });
      console.log(allLangs);

      return res.status(200).json(allLangs);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "getAllLangsByUser error" });
    }
  }

  async changeFamilyName(req, res) {
    const token = req.cookies["token"];
    const { familyName } = req.body;
    console.log(familyName);
    const userID = await getDb().models.Token.findOne({
      where: { refreshToken: token },
    });
    if (!userID) return res.status(401).json("unauthorized");

    const updUser = await getDb()
      .models.User.findOne({
        where: { user_id: userID.userID },
      })
      .then((account) => {
        account.familyName = familyName;
        account.save();
        console.log("saved");
      });

    const getUser = await getDb().models.User.findOne({
      where: { user_id: userID.userID },
    });
    const userData = new UserDto(getUser);
    return res.json(userData);
  }
  async changeGivenName(req, res) {
    const token = req.cookies["token"];
    const { given_name } = req.body;
    console.log(given_name);
    const userID = await getDb().models.Token.findOne({
      where: { refreshToken: token },
    });
    if (!userID) return res.status(401).json("unauthorized");

    const updUser = await getDb()
      .models.User.findOne({
        where: { user_id: userID.userID },
      })
      .then((account) => {
        account.given_name = given_name;
        account.save();
        console.log("saved");
      });

    const getUser = await getDb().models.User.findOne({
      where: { user_id: userID.userID },
    });
    const userData = new UserDto(getUser);
    return res.json(userData);
  }
}
module.exports = new userController();
