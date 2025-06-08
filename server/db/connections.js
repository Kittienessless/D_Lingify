const createConnections = (sequelize) => {
  const { User, Token, Language, Role} = sequelize.models;

  User.hasOne(Token);
  Token.belongsTo(User);
  
  Role.hasOne(User);
  User.belongsTo(Role);

  User.hasMany(Language, {
    foreignKey: "userID",
  });
  Language.belongsTo(User, {
    foreignKey: "userID",
  });
};

module.exports = createConnections;
