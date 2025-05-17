const { DataTypes } = require("sequelize");

const Language = (sequelize) =>
  sequelize.define("Language", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LangPath: {
      type: DataTypes.STRING,
      allowNull: true,

    },
  });

module.exports = {
  Language,
};
