const Validator = require("validator");
const { toValidText } = require("./validation_util");


module.exports = ({ email, password }) => {

  email = toValidText(email);
  password = toValidText(password);

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