const { userModel, challengeModel } = require("../../DAL/models");

/**
 * > Servicio con reglas de negocio para crear
 * > un registro en la base de datos
 * @param {Number} userId
 * @param {JSON} challengeData
 * @returns //* Object: ChallengeDTO
 */
const newChallenge = (userId, challengeData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exists", null]);
      }

      //COMMENT: creamos registro del challenge.
      challengeData = { ...challengeData, userId: userId };
      await challengeModel.add(challengeData);

      resolve();
    } catch (err) {
      reject(["Error del servidor", err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para listar
 * > todos los registros de un usario.
 * @param {Number} userId
 * @returns {Promise<Array>} ChallengeDTO
 */
const myChallenges = (userId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar en la base de datos usuario por id.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: 3. obtener los challenges de la base de datos.
      const userChallengeList = await challengeModel.find(userId);

      resolve(userChallengeList);
    } catch (err) {
      reject(["Error del servidor", err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para editar
 * > un registro de un usuario en la base de datos
 * @param {Number} userId
 * @param {Number} challengeId
 * @param {JSON} challengeData
 * @returns {Promise}
 */
const editChallenge = (userId, challengeId, challengeData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: verificar que exista el challenge.
      const challengeExists = await challengeModel.findOne({
        challengeId: challengeId,
      });
      if (!challengeExists) {
        reject(["Challenge Doesn't Exist", null]);
      }

      //COMMENT: verificar que le pertenezca al usuario.
      if (challengeExists.userId !== userId) {
        reject(["This Challenge Ain't Your Own", null]);
      }

      //COMMENT: actualizamos los datos del challenge usando "challengeid".
      challengeData = { ...challengeData, challengeId: challengeId };
      await challengeModel.update(challengeData);
      resolve();
    } catch (err) {
      reject(["Error del Servidor", err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para eliminar
 * > un registro de un usuario en la base de datos
 * @param {Number} userId
 * @param {Number} challengeId
 */
const removeChallenge = async (userId, challengeId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. verificar que exista el challenge.
    const challengeExists = await challengeModel.findOne({
      challengeId: challengeId,
    });
    if (!challengeExists) {
      throw Error("Challenge Doesn't Exist");
    }

    //[x]: 3.5 verificar que le pertenezca al usuario.
    if (challengeExists.userId !== userId) {
      throw Error("This Challenge Ain't Your Own");
    }

    //[x]: 4. eliminamos el challenge.
    //? Se podra enviar algun dato ademas del codigo de respuesta al frontend?
    await challengeModel.eraseById(challengeId);
  } catch (err) {}
};

module.exports = { newChallenge, myChallenges, editChallenge, removeChallenge };
