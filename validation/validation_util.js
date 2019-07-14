const errRes = (res, status, errObj) => (
  res.status(status).json(errObj)
);

const isValidText = str => (
  typeof str === "string" && str.toString().length > 0
)

const toValidText = str => (
  isValidText(str) ? str : ""
);

const flattenObj = (obj) => {
  const flattened = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObj(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })

  return flattened
}

module.exports = {
  errRes: errRes,
  toValidText: toValidText,
  isValidText: isValidText,
  flattenObj: flattenObj
};