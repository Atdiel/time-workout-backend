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

/**
 * ? reglas de negocio cuando se autentica un usuario
 * @param {Object} userData
 * @returns {Promise}
 */
const userSignIn = (userData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: consultar a la base de datos por email.
      let userFound = await userModel.findOne({ email: userData.email });
      if (!userFound) {
        reject(["No existe usuario con este email", null]);
      }
      const hashedPassword = userFound.password;
      userFound = { ...userFound, password: undefined, timestamp: undefined };

      //COMMENT: verificar que su contraseña sea la misma que la encryptada almacenada en la BD.
      const checkValidPassword = await comparePassword(
        userData.password,
        hashedPassword
      );
      if (!checkValidPassword) {
        reject(["Contraseña incorrecta", null]);
      }

      //COMMENT: mandamos token para futuras peticiones.
      const data = {
        token: await signToken(userFound),
        userFound,
      };
      resolve(data);
    } catch (err) {
      reject(["Error del servidor", err]);
    }
  });
};

/**
 * ? reglas de negocio para modificar datos de un usuario
 * @param {Number} accountId
 * @param {Object} userData
 * @returns {Promise}
 */
const updateAccount = (accountId, userData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: usar el id de el token para verificar que exista el usuario.
      var userFoundById = await userModel.findOne({ userId: accountId });
      if (!userFoundById) {
        reject(["Usuario no encontrado", null]);
      }

      //COMMENT: asegurarse que no este introduciendo un correo ya registrado a menos que sea el suyo.
      if (userFoundById.email !== userData.email) {
        var checkEmailExist = await userModel.findOne({
          email: userData.email,
        });
        if (checkEmailExist) {
          reject(["Este Correo ya se a registrado", null]);
        }
      }

      //COMMENT: encriptar la password.
      const plainPassword = userData.password;
      const hashedPassword = await hashPassword(plainPassword);
      // Reemplazamos el valor de password por la password ya encriptada
      userData = { ...userData, password: hashedPassword };

      //COMMENT: actualizar todos los datos del usuario.
      await userModel.update(accountId, userData);

      resolve();
    } catch (err) {
      reject(["Error del servidor", err]);
    }
  });
};

module.exports = { userSignUp, userSignIn, updateAccount };
