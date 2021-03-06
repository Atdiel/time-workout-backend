const { recordModel, userModel } = require("../../DAL/models");

/**
 * > Servicio que define reglas de negocio al crear un nuevo registro
 * @param {int} userId
 * @param {JSON} recordData
 * @returns {Promise} void
 */
const newRecord = (userId, recordData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: creamos registro del record con el "userId" previamente obtenido.
      recordData = { ...recordData, userId: userId };
      await recordModel.add(recordData);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para listar todos
 * > los registros del usuario de la tabla record
 * @param {int} userId
 * @returns {Promise<Array<JSON>>} RecordDTO
 */
const myRecords = (userId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar en la base de datos usuario por id.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: obtener los records de la base de datos.
      const userRecordList = await recordModel.find(userId);

      resolve(userRecordList);
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para editar un
 * > registro de la tabla record
 * @param {int} userId
 * @param {int} recordId
 * @param {JSON} recordData
 * @returns {Promise} void
 */
const editRecord = (userId, recordId, recordData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista el record.
      const recordExists = await recordModel.findOne({
        recordId: recordId,
      });
      if (!recordExists) {
        reject([null, "Record Doesn't Exist", 404]);
      }

      //COMMENT: verficar que el record pertenezca al usuario.
      if (recordExists.userId !== userId) {
        reject([null, "This Record Ain't Your Own", 403]);
      }

      //COMMENT: actualizamos los datos del record usando "recordid".
      recordData = { ...recordData, recordId: recordId };
      await recordModel.update(recordData);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para eliminar
 * > un registro de un usuario en la tabla record
 * @param {int} userId
 * @param {int} recordId
 */
const removeRecord = (userId, recordId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista el record.
      const recordExists = await recordModel.findOne({
        recordId: recordId,
      });
      if (!recordExists) {
        reject([null, "Routine Doesn't Exist", 404]);
      }

      //COMMENT: verificar que el record sea propio del usuario
      if (recordExists.userId !== userId) {
        reject([null, "This Record Ain't Your own", 403]);
      }

      //COMMENT: eliminamos el record.
      await recordModel.eraseById(recordId);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

module.exports = { newRecord, myRecords, editRecord, editRecord, removeRecord };
