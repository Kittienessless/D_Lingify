const createConnections = (sequelize) => {
  const { User, Token, Language } = sequelize.models;

  User.hasOne(Token);
  Token.belongsTo(User);

  User.hasMany(Language, {
    foreignKey: "userID",
  });
  Language.belongsTo(User, {
    foreignKey: "userID",
  });
};

module.exports = createConnections;
