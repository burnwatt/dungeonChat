const Validator = require("validator");
const { toValidText, isValidText, flattenObj } = require("./validation_util");

module.exports = ({ char_attrs }) => {

  let attrs = Object.values(flattenObj(char_attrs));
  // attrs = attrs.map(attr => toValidText(attr));


  const errors = {
    ...(attrs.all(attr => isValidText(attr)) && { char_attrs: "Attributes must be text only" })
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}