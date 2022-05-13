/**
 * maneja los errores, enviando una respuesta con un mensaje y el error
 * @param {*} res
 * @param {*} message
 * @param {*} err
 * @param {*} code
 */
const handleHttpError = (res, message, err = "", code = 403) => {
  res.status(code);
  res.send({ message: message, error: err });
};

module.exports = { handleHttpError };
