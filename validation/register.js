const Validator = require("validator");
const validText = require("./valid-text");

module.exports = ({ handle, email, password, password2 }) => {

  handle = validText(handle) ? handle : "";
  email = validText(email) ? email : "";
  password = validText(password) ? password : "";
  password2 = validText(password2) ? password2 : "";

  const errors = {
    ...(!Validator.isLength(handle, { min: 2, max: 30 })
      && { handle: "Handle must be between 2 and 30 charecters" }),
    ...(Validator.isEmpty(handle) && { handle: "Handle field is required" }),
    ...(Validator.isEmpty(email) && { email: "Email field is required" }),
    ...(!Validator.isEmail(email) && { email: "Email is invalid" }),
    ...(!Validator.isLength(password, { min: 6, max: 30 })
      && { password: "Password must be at least 6 charecters" }),
    ...(Validator.isEmpty(password) && { password: "Password field is required" }),
    ...(Validator.isEmpty(password2) && { password2: "Confirm Password field is required" }),
    ...(!Validator.equals(password, password2) && { password2: "Passwords must match" })
  };
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };

}