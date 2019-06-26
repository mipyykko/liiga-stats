const throwError = (status, code, message) => {
  const error = new Error(message)

  error.status = status
  error.code = code

  throw error
}

module.exports = { throwError }
