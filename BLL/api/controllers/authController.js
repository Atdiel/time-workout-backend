const { matchedData } = require("express-validator");
const { handleHttpError } = require("../handlers/handleError");
const authService = require("../../businessServices/authService");

/**
 * Se encarga de registrar al usuario y crear su token
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    // Limpiamos la @req dejando solo campos autorizados por validator-middleware
    const userData = matchedData(req);
    //[x] Usamos el servicio para gestionar el registro de usuario
    const data = await authService.userSignUp(userData);

    res.send({ data });
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CONTROLADOR_AUTH", err);
  }
};

/**
 * verificar que el usuario exista usando email y password
 * @param {*} req
 * @param {*} res
 * @returns datos del usuario y token
 */
const loginUser = async (req, res) => {
  try {
    const userData = matchedData(req);
    //[x]: configurar el servicio para autenticar usuario
    const data = await authService.userSignIn(userData);

    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_LOGIN", err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = matchedData(req);
    //[x]: Creamos un service para actualizar un usuario
    const data = await authService.updateAccount(userId, userData);

    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_UPDATE_USER", err);
  }
};

module.exports = { registerUser, loginUser, updateUser };
