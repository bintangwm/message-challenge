module.exports = function (err, req, res, next) {
  let status = err.status || 500
  let msg = err.msg || 'internal server error!'

  if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = err.errors[0].message
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = err.errors[0].message
  }
  res.status(status).json({msg})
}