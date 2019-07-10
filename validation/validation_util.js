const errRes = (res, status, errObj) => (
  res.status(status).json(errObj)
);

const validText = str => (
  typeof str === "string" && str.toString().length > 0
);

const textValid = str => (
  validText(str) ? str : ""
);

module.exports = {
  errRes: errRes,
  validText: validText,
  textValid: textValid
};