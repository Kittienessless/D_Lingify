const {DataTypes} = require("sequelize");

const Token = sequelize => sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,

    },
    refreshToken: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false

    }

});

module.exports = {
    Token
}