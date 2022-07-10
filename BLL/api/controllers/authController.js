const { matchedData } = require("express-validator");
const authService = require("../../businessServices/authService");
const { handleHttpError } = require("../handlers/handleError");

/**
 * ? se encarga de registrar al usuario y crear su token
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const userData = matchedData(req);
    await authService.userSignUp(userData);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
};

/**
 * ? obtener un usuario existente usando email y password
 * @param {*} req
 * @param {*} res
 * @returns {JSON} datos del usuario y token
 */
const loginUser = async (req, res) => {
  try {
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const userData = matchedData(req);
    const data = await authService.userSignIn(userData);

    res.send({ success: true, data });
  } catch (err) {
    handleHttpError(res, err);
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

    await authService.updateAccount(userId, userData);
    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
};

module.exports = { registerUser, loginUser, updateUser };
