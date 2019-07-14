const Validator = require("validator");
const { toValidText } = require("./validation_util");

const TYPES = ["Say", "Describe", "Chat"];

module.exports = ({ campaign_id, character_id, user_id, type, body }) => {

  type = toValidText(type);
  body = toValidText(body);

  const errors = {
    ...(!Validator.isLength(body, { min: 1, max: 1000 })
      && { body: "Body must be between 1 and 1000 characters"}),
    ...(TYPES.includes(type) && { type: `Type must be one of ${TYPES.join(", ")}`}),
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}