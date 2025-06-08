const { getDb } = require("../db/db.js");
require("dotenv").config();
const saltRounds = 5;
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService.js");
const UserDto = require("../dbo/user-dto.js");
const ApiError = require("../exceptions/api-error.js");
const { where } = require("sequelize");
const tokenService = require("./tokenService.js");
const LangDto = require("../dbo/lang-dto.js");

class UserService {
  async registration(email, password) {
    try {
      const login = await getDb().models.User.findOne({
        where: {
          email: email,
        },
      });

      if (login !== null) {
        throw ApiError.BadRequest("Пользователь существует");
      }

      const hashPassword = await bcrypt.hash(password, saltRounds);
      const actLink = uuid.v4();
      const resetLink = uuid.v4();

      const user = await getDb().models.User.create({
        email: email,
        password: hashPassword,
        role: process.env.USER_ROLE,
        activationLink: actLink,
        isActivated: false,
        resetLink: resetLink,
      });
      console.log("created user");
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}auth/activate/${actLink}`
      );
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      console.log(tokens.refreshToken);

      await tokenService.saveToken(userDto.user_id, tokens.refreshToken);
      console.log("saved");
      return {
        ...tokens,
        user: userDto,
      };
    } catch (e) {
      throw ApiError.BadRequest(e + "registration user service error");
    }
  }

  async activation(activationLink) {
    const user = await getDb().models.User.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw ApiError.BadRequest("некорректная ссылка активации");
    }

    await getDb()
      .models.User.findOne({
        where: {
          activationLink,
        },
      })
      .then(function (user) {
        user.isActivated = true;
        user.save().then(function () {
          console.log("saved");
        });
      });

    console.log("saved user ");
  }

  async login(email, password) {
    try {
      const user = await getDb().models.User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) throw ApiError.BadRequest("Пользователь не существует");

      const isPassEquals = bcrypt.compare(password, user.password);
      if (!isPassEquals) throw ApiError.BadRequest("Пароль неверный");

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.user_id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async loginByGoogle(user) {
    try {
      const userDto = new UserDto(user);
      console.log(userDto + "userDto");
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.user_id, tokens.refreshToken);

      console.log(tokens.refreshToken);
      return {
        ...tokens,
        user: userDto,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async registerByGoogle(user) {
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    console.log(tokens + "register login");
    await tokenService.saveToken(userDto.user_id, tokens.refreshToken);
    console.log(tokens.refreshToken + "register login");

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDto = await tokenService.findToken(refreshToken);

    

    const user = await getDb().models.User.findOne({
      where: {
        user_id: userData.user_id,
      },
    });

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.user_id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async ResetPassword(resetLink, email) {
    try {
      const user = await getDb().models.User.findOne({
        where: { resetLink: resetLink },
      });
      if (!user) {
        throw ApiError.BadRequest("некорректная ссылка восстановления пароля");
      }

      await mailService.sendResetPasswordMail(
        user.email,
        `${process.env.API_URL}user/reset/${resetLink}`
      );
      console.log("mail sended");
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e + "reset pwd service error");
    }
  }
  async GetResetLink(resetLink) {
    try {
      const user = await getDb().models.User.findOne({
        where: { resetLink: resetLink },
      });
      if (!user) {
        throw ApiError.BadRequest("некорректная ссылка активации");
      }
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e + "reset pwd service error");
    }
  }
  
  async reset(email, password) {
    try {
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const user = await getDb()
        .models.User.findOne({
          where: {
            email,
          },
        })
        .then(function (user) {
          user.password = hashPassword;
          user.save().then(function () {
            console.log("saved");
          });
        });

      await mailService.sendEmailSuccessChangedPassword(user.email);

      console.log("password changed");
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e + "reset pwd service error");
    }
  }
}

module.exports = new UserService();
