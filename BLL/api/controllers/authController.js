const { matchedData } = require("express-validator");
const { handleHttpError } = require("../handlers/handleError");
const authService = require("../../businessServices/authService");

/**
 * ? se encarga de registrar al usuario y crear su token
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const userData = matchedData(req);
    //FIXME este servicio no debe devolver ninguna respuesta
    const data = await authService.userSignUp(userData);

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CONTROLADOR_AUTH", err);
  }
};

/**
 * ? obtener un usuario existente usando email y password
 * @param {*} req
 * @param {*} res
 * @returns datos del usuario y token
 */
const loginUser = async (req, res) => {
  try {
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const userData = matchedData(req);
    const data = await authService.userSignIn(userData);

    res.send({ success: true, data });
  } catch (err) {
    handleHttpError(res, "ERROR_LOGIN", err);
  }
};

/**
 * ? editar datos de un usuario
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const userData = matchedData(req);
    //FIXME tampoco debe devolver ningun resultado, excepto que se cumplio sin error
    const data = await authService.updateAccount(userId, userData);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, "ERROR_UPDATE_USER", err);
  }
};

module.exports = { registerUser, loginUser, updateUser };
