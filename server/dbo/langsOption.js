module.exports = class LangsOptions {
  id;
  label;
  value;

  constructor(model) {
    this.id = model.id;
    this.label = model.Title;
    this.value = model.Title;
    
  }
};
