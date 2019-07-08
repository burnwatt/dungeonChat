module.exports = str => (
  typeof str === "string" && str.toString().length > 0
);