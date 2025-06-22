module.exports = class UserDto {
  email;
  user_id;
  isActivated;
  role;
  given_name;
  family_name;
  constructor(model) {
    this.user_id = model.user_id;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.role = model.role;
    this.given_name = model.given_name;
    this.family_name = model.familyName;
    
  }
};
