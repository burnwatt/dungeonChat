const Validator = require("validator");
const validText = require("./valid-text");

module.exports = ({ email, password }) => {

  email = validText(email) ? email : "";
  password = validText(password) ? password : "";

  const errors = {
    ...(!Validator.isEmail(email) && { email: "Email is invalid" }),
    ...(Validator.isEmpty(email) && { email: "Email field is required" }),
    ...(Validator.isEmpty(password) && { password: "Password field is required" })
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };

};