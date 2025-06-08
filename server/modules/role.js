const { DataTypes } = require("sequelize");
 
const Role = (sequelize) =>
  sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

module.exports = {
  Role
 
};
