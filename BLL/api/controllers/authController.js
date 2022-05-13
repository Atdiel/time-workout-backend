const { matchedData } = require("express-validator");
const { hashPassword, comparePassword } = require("../handlers/handlePassword");
const { signToken } = require("../handlers/handleJwt");
const { handleHttpError } = require("../handlers/handleError");
const { userModel } = require("../../../DAL/models");

/**
 * Se encarga de registrar al usuario y crear su token
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const hashedPassword = await hashPassword(req.password);
    const body = { ...req, password: hashedPassword };
    //TODO: crear la conexion con un modelo de la base de datos
    const dataUser = await userModel.create(body);
    //dataUser.set("password", undefined, { strict: false });

    // let dataUser = require("../dummyDB/user.json");
    const data = {
      token: await signToken(dataUser),
      //TODO: configurar el output de la api aqui:
      user: body,
    };

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
    req = matchedData(req);
    //TODO: configurar el modelo para recupera datos de user
    //const user = await userModel
    //  .findOne({ email: req.email })
    //  .select("name password email role");

    //TODO: logica eliminada hasta crear el modelo de DB
    /*
    if (!user) {
      return handleHttpError(res, "Correo no encontrado", 401);
    }
    // verificar las contraseñas
    const hashedPassword = user.password;
    user.set("password", undefined, { strict: false }); // solo necesitamos el password para el compare
    const check = await comparePassword(req.password, hashedPassword);
    if (!check) {
      return handleHttpError(res, "Contraseña incorrecta", 401);
    }

    //TODO: si todo esta bien podemos mandar la data con el token generado
    const data = {
      token: await signToken(user),
      user,
    };
    */

    //TODO: luego de configurar models borrar hasta @res.send();
    let dummyUser = require("../dummyDB/user.json");
    if (req.email != dummyUser.email || req.password != dummyUser.password) {
      return handleHttpError(res, "CREDENCIALES_INVALIDAS", "", 401);
    }
    const data = {
      token: await signToken(dummyUser),
      user: dummyUser,
    };

    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_LOGIN", err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    req = matchedData(req);
    const body = req;
    let dummyUser = require("../dummyDB/user.json");

    if (id != dummyUser.userId) {
      return handleHttpError(res, "USER_ID_NOT_FOUN");
    }
    res.send({ body });
  } catch (err) {
    handleHttpError(res, "ERROR_UPDATE_USER", err);
  }
};

module.exports = { registerUser, loginUser, updateUser };
