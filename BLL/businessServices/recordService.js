const { recordModel, userModel } = require("../../DAL/models");

/**
 * > Servicio que define reglas de negocio al crear un nuevo registro
 * @param {int} userId
 * @param {JSON} recordData
 * @returns {Promise}
 */
const newRecord = (userId, recordData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: creamos registro del record con el "userId" previamente obtenido.
      recordData = { ...recordData, userId: userId };
      await recordModel.add(recordData);

      resolve();
    } catch (err) {
      reject(["Error del Servidor", err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para listar todos
 * > los registros del usuario de la tabla record
 * @param {int} userId
 * @returns {Promise<Array<JSON>>} - RecordDTO
 */
const myRecords = (userId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar en la base de datos usuario por id.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: obtener los records de la base de datos.
      const userRecordList = await recordModel.find(userId);

      resolve(userRecordList);
    } catch (err) {
      reject(["Error del Servidor", err]);
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
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: verificar que exista el record.
      const recordExists = await recordModel.findOne({
        recordId: recordId,
      });
      if (!recordExists) {
        reject(["Record Doesn't Exist", null]);
      }

      //COMMENT: verficar que el record pertenezca al usuario.
      if (recordExists.userId !== userId) {
        reject(["This Record Ain't Your Own", null]);
      }

      //COMMENT: actualizamos los datos del record usando "recordid".
      recordData = { ...recordData, recordId: recordId };
      await recordModel.update(recordData);

      resolve();
    } catch (err) {
      reject(["Error del Servidor", err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para eliminar
 * > un registro de un usuario en la tabla record
 * @param {Number} userId
 * @param {Number} recordId
 */
const removeRecord = async (userId, recordId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. verificar que exista el record.
    const recordExists = await recordModel.findOne({
      recordId: recordId,
    });
    if (!recordExists) {
      throw Error("Routine Doesn't Exist");
    }
    //[x]: 3.5 verificar que el record sea propio del usuario
    if (recordExists.userId !== userId) {
      throw Error("This Record Ain't Your own");
    }

    //[x]: 4. eliminamos el record.
    //? Se podra enviar algun dato ademas del codigo de respuesta al frontend?
    await recordModel.eraseById(recordId);
  } catch (err) {}
};

module.exports = { newRecord, myRecords, editRecord, editRecord, removeRecord };
