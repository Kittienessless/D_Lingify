module.exports = class UserDto {
  email;
  user_id;
  isActivated;
  role;

  constructor(model) {
    this.email = model.email;
    this.user_id = model.user_id;
    this.isActivated = model.isActivated;
    this.role = model.role;

    
  }
};
