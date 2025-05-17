const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getDb } = require("../db/db.js");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    console.log(accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(user_id, refreshToken) {
    const data = await getDb().models.Token.findOne({
      where: { userID: user_id }
    });
   
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await getDb().models.Token.create({
      userID: user_id,
      refreshToken: refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await getDb().models.Token.destroy({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(token) {
    try {
      const tokenData = await getDb().models.Token.findOne({
        where: { refreshToken: token },
      });
      return tokenData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
