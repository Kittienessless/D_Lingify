const { Sequelize, DataTypes } = require("sequelize");
 
const User = (sequelize) =>
  sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activationLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    given_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bearer: {
      type: DataTypes.STRING,
      allowNull: true,
    } 
  });

module.exports = {
  User
 
};
