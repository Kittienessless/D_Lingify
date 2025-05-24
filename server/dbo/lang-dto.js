module.exports = class LangDto {
  id;
  Title;
  Description;
  LangPath;
  createdAt;
  constructor(model) {
    this.id = model.id;
    this.Title = model.Title;
    this.Description = model.Description;
    this.LangPath = model.LangPath;
    this.createdAt = model.createdAt;
    

  }
};
