module.exports = class LangDto {
  id;
  userID;
  Title;
  Description;
  
  constructor(model) {
    this.id = model.id;
    this.userID = model.userID;
    this.Title = model.Title;
    this.Description = model.Description;
  }
};
