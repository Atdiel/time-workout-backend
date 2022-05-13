const { handleHttpError } = require("../handlers/handleError");
const { verifyToken } = require("../handlers/handleJwt");

/**
 * middleware para verificar token jwt y mandar al controller un id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  try {
    // si no existe la clave en el header
    if (!req.headers.authorization) {
      return handleHttpError(res, "MISSING_TOKEN", 401);
    }
    // creamos el token eliminando barer
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    // verificamos que tenga un id el token
    if (!dataToken._id) {
      return handleHttpError(res, "ERROR_INVALID_TOKEN_ID");
    }

    // agregamos el id del usuario para usarlo luego en el controller
    req.user = { id: dataToken._id };

    next();
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_TOKEN_MIDDLEWARE", err);
  }
};

module.exports = { authMiddleware };
