const { userModel } = require("../../DAL/models");
const { hashPassword, comparePassword } = require("../helpers/passwordHelper");
const { signToken } = require("../helpers/jwtHelper");

/**
 *? reglas de negocio para crear un usuario
 * @param {Object} userData
 * @returns {Promise}
 */
const userSignUp = (userData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: Encriptamos la contraseña para su posterior almacenamiento
      const hashedPassword = await hashPassword(userData.password);

      //COMMENT: Reemplazamos el valor de password por la password ya encriptada
      userData = { ...userData, password: hashedPassword };

      //COMMENT: Verificamos que el correo no este en uso por otro usuario
      var userFound = await userModel.findOne({ email: userData.email });
      if (userFound) {
        reject(["Este Correo ya esta registrado", null]);
      }

      //COMMENT: Registramos el usuario en la BD
      await userModel.add(userData);
      resolve();
    } catch (err) {
      reject(["Error del servidor", err]);
    }
  });
};

const userSignIn = async (userData) => {
  try {
    //[x]: 1. consultar a la base de datos por email.
    let userFound = await userModel.findOne({ email: userData.email });
    if (!userFound) {
      throw Error("No existe usuario con este email");
    }
    //[x]: 2. verificar que su contraseña sea la misma que la encryptada almacenada en la BD.
    const hashedPassword = userFound.password;
    userFound = { ...userFound, password: undefined, timestamp: undefined };

    const checkValidPassword = await comparePassword(
      userData.password,
      hashedPassword
    );
    if (!checkValidPassword) {
      throw Error("Contraseña incorrecta");
    }
    //[x]: 3. mandamos token para futuras peticiones.

    const data = {
      token: await signToken(userFound),
      userFound,
    };

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("AUTH_SERVICE: USER_SIGN_IN_ERROR");
  }
};

const updateAccount = async (accountId, userData) => {
  "use strict";
  try {
    //[x]: 2. usar el id de el token para verificar que exista el usuario.
    var userFound = await userModel.findOne({ userId: accountId });
    if (!userFound) {
      throw Error("Usuario no encontrado");
    }
    const ownUserEmail = userFound.email;
    //[x]: 2.5 asegurarse que no este introduciendo un correo ya registrado a menos que sea el suyo.
    var userFoundSameEmail = await userModel.findOne({ email: userData.email });
    if (userFoundSameEmail.email !== ownUserEmail) {
      throw Error("Este Correo ya se a registrado");
    }

    //[x]: 3. encriptar la password.
    const plainPassword = userData.password;
    const hashedPassword = await hashPassword(plainPassword);
    // Reemplazamos el valor de password por la password ya encriptada
    userData = { ...userData, password: hashedPassword };

    //[x]: 4. actualizar todos los datos del usuario.
    await userModel.update(accountId, userData);

    //[x]: 5. mandar los nuevos datos del usuario al Frontend.
    var userUpdated = await userModel.findOne({ userId: accountId });

    const data = {
      ...userUpdated,
      password: plainPassword,
      timestamp: undefined,
    };

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("AUTH_SERVICE: UPDATE_ACCOUNT_ERROR");
  }
};

module.exports = { userSignUp, userSignIn, updateAccount };
