const errRes = (res, status, errObj) => (
  res.status(status).json(errObj)
);

module.exports = {
  errRes: errRes,
};