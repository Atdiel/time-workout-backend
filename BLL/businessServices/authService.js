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
        reject([null, "Este Correo ya esta registrado", 409]);
      }

      //COMMENT: Registramos el usuario en la BD
      await userModel.add(userData);
      resolve();
    } catch (err) {
      reject([err]);
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
        reject([null, "No existe usuario con este email", 404]);
      }
      const hashedPassword = userFound.password;
      userFound = { ...userFound, password: undefined, timestamp: undefined };

      //COMMENT: verificar que su contraseña sea la misma que la encryptada almacenada en la BD.
      const checkValidPassword = await comparePassword(
        userData.password,
        hashedPassword
      );
      if (!checkValidPassword) {
        reject([null, "Contraseña incorrecta", 403]);
      }

      //COMMENT: mandamos token para futuras peticiones.
      const data = {
        token: await signToken(userFound),
        userFound,
      };
      resolve(data);
    } catch (err) {
      reject([err]);
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
        reject([null, "Usuario no encontrado", 404]);
      }

      //COMMENT: asegurarse que no este introduciendo un correo ya registrado a menos que sea el suyo.
      if (userData.email) {
        if (userFoundById.email !== userData.email) {
          var checkEmailExist = await userModel.findOne({
            email: userData.email,
          });
          if (checkEmailExist) {
            reject([null, "Este Correo ya se a registrado", 409]);
          }
        }
      }

      //COMMENT: encriptar la password.
      if (userData.password) {
        const plainPassword = userData.password;
        const hashedPassword = await hashPassword(plainPassword);
        // Reemplazamos el valor de password por la password ya encriptada
        userData = { ...userData, password: hashedPassword };
      }

      //COMMENT: actualizar todos los datos del usuario.
      await userModel.update(accountId, userData);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

module.exports = { userSignUp, userSignIn, updateAccount };
