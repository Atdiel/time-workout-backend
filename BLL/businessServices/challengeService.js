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
        reject([null, "User Doesn't Exists", 404]);
      }

      //COMMENT: creamos registro del challenge.
      challengeData = { ...challengeData, userId: userId };
      await challengeModel.add(challengeData);

      resolve();
    } catch (err) {
      reject([err]);
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
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: 3. obtener los challenges de la base de datos.
      const userChallengeList = await challengeModel.find(userId);

      resolve(userChallengeList);
    } catch (err) {
      reject([err]);
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
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista el challenge.
      const challengeExists = await challengeModel.findOne({
        challengeId: challengeId,
      });
      if (!challengeExists) {
        reject([null, "Challenge Doesn't Exist", 404]);
      }

      //COMMENT: verificar que le pertenezca al usuario.
      if (challengeExists.userId !== userId) {
        reject([null, "This Challenge Ain't Your Own", 403]);
      }

      //COMMENT: actualizamos los datos del challenge usando "challengeid".
      challengeData = { ...challengeData, challengeId: challengeId };
      await challengeModel.update(challengeData);
      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para eliminar
 * > un registro de un usuario en la base de datos
 * @param {Number} userId
 * @param {Number} challengeId
 */
const removeChallenge = (userId, challengeId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista el challenge.
      const challengeExists = await challengeModel.findOne({
        challengeId: challengeId,
      });
      if (!challengeExists) {
        reject([null, "Challenge Doesn't Exist", 404]);
      }

      //COMMENT: verificar que le pertenezca al usuario.
      if (challengeExists.userId !== userId) {
        reject([null, "This Challenge Ain't Your Own", 403]);
      }

      await challengeModel.eraseById(challengeId);
      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

module.exports = { newChallenge, myChallenges, editChallenge, removeChallenge };
