const { getDb } = require("../db/db.js");
require("dotenv").config();
const { checkAuth } = require("../modules/user.js");
const userService = require("../services/userService.js");
const COOKIE_NAME = "token";
const COOKIE_ROLE = "role";
const { OAuth2Client } = require("google-auth-library");
const uuid = require("uuid");
const ApiError = require("../exceptions/api-error.js");
const UserDto = require("../dbo/user-dto.js");
const tokenService = require("../services/tokenService.js");
const { validationResult } = require("express-validator");

class authController {
  async registration(req, res, next) {
    const { email, password, given_name, familyName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError.BadRequest("Ошибка валидации", errors.array());
    }

    const userData = await userService.registration(
      email,
      password,
      given_name,
      familyName
    );
    res.cookie(COOKIE_NAME, userData.refreshToken, {
      maxAge: 38 * 24 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.cookie(COOKIE_ROLE, String(userData.user.role), {
      maxAge: 38 * 24 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    return res.json(userData);
  }

  async googleAuth(req, res, next) {
    console.log("get into server");

    try {
      const { code } = req.body;

      const googleClient = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
      );
      const { tokens } = await googleClient.getToken(code);

      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = await ticket.getPayload();

      const login = await getDb().models.User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (login) {
        const userData = await userService.loginByGoogle(login);
        res.cookie(COOKIE_NAME, userData.refreshToken, {
          maxAge: 38 * 24 * 60 * 1000,
          httpOnly: true,
          secure: false,
        });
        return res.json(userData);
      }

      const newUser = await getDb().models.User.create({
        email: payload.email,
        password: "",
        role: parseInt(1),
        activationLink: "",
        isActivated: true,
        given_name: payload?.given_name,
        familyName: payload?.family_name,
        resetLink: "",
      });

      const userData = await userService.registerByGoogle(newUser);
      res.cookie(COOKIE_NAME, userData.refreshToken, {
        maxAge: 38 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async GoogleRefresh(req, res, next) {
    try {
      const user = new UserRefreshClient(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        req.body.refreshToken
      );
      res.cookie(COOKIE_NAME, user.refreshToken, {
        maxAge: 38 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      const { credentials } = await user.refreshAccessToken();
      res.json(credentials);
      return;
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activation(activationLink);
      return res.redirect(`${process.env.CLIENT_URL}#/Profile`);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie(COOKIE_NAME, userData.refreshToken, {
        maxAge: 38 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      res.cookie(COOKIE_ROLE, String(userData.user.role), {
        maxAge: 38 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const token = req.cookies["token"];
      const userData = await userService.refresh(token);
      res.cookie(COOKIE_NAME, userData.refreshToken, {
        maxAge: 38 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      res.cookie(COOKIE_ROLE, String(userData.user.role), {
        maxAge: 38 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
      console.log("refresh error" + e);
    }
  }

  async getOneUserByPK(req, res, next) {
    try {
      const token = req.cookies["token"];

      const userToken = await tokenService.findToken(token);
      if (!userToken) return res.status(401).json("unauthorized");

      const userData = await getDb().models.User.findOne({
        where: { user_id: userToken.userID },
      });

      res.status(200).json(userData);
    } catch (e) {
      console.log(e);

      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      console.log("logout");
      const token = req.cookies["token"];

      const Rtoken = await userService.logout(token);

      res.clearCookie(COOKIE_NAME);
      res.clearCookie(COOKIE_ROLE);

      return res.json(Rtoken);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new authController();
