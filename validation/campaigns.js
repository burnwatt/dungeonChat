const Validator = require("validator");
const { toValidText } = require("./validation_util");

module.exports = ({ cover_art_url, password, name, description, rules, 
  character_sheet_id, message_ids, user_ids, created_by, is_private}) => {

    cover_art_url = toValidText(cover_art_url);
    password = toValidText(password);
    name = toValidText(name);
    description = toValidText(description);
    rules = toValidText(rules);

    const errors = {
      ...(!Validator.isLength(name, { min: 2, max: 75 }) 
        && { name: "Name must be between 2 and 75 characters"}),
      ...(!Validator.isLength(description, { min: 0, max: 500 })
        && { description: "Must be equal to or less than 500 characters" }),  
      ...(!Validator.isLength(rules, { max: 1000 })
        && { rules: "Must be equal to or less than 1000 characters" }),    
    };

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };