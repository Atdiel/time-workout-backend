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
 * @param {Number} userId
 * @returns //* Array: RecordDTO
 */
const myRecords = async (userId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. buscar en la base de datos usuario por id.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. obtener los records de la base de datos.
    //! EL DTO RECORD CONVERTIRA EL RESULTADO DE LA DB A UNA LISTA CON OBJETOS JSON
    const userRecordList = await recordModel.find(userId);

    //[x]: 4. mandar al frontend el resultado.
    const data = userRecordList;
    return data;
  } catch (err) {}
};

/**
 * > Servicio con reglas de negocio para editar un
 * > registro de la tabla record
 * @param {Number} userId
 * @param {Number} recordId
 * @param {JSON} recordData
 * @returns //* Object: RecordDTO
 */
const editRecord = async (userId, recordId, recordData) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. verificar que exista el record.
    const checkRecordExist = await recordModel.findOne({ recordId: recordId });
    if (!checkRecordExist) {
      throw Error("Record Doesn't Exist");
    }
    //[x]: 3.5 verficar que el record pertenezca al usuario.
    if (checkRecordExist.userId !== userId) {
      throw Error("This Record Ain't Your Own");
    }

    //[x]: 4. actualizamos los datos del record usando "recordid".
    recordData = { ...recordData, recordId: recordId };
    await recordModel.update(recordData);

    //[x]: 5. devolvemos el record recien actualizado.
    const recordCreated = await recordModel.findOne({ recordId: recordId });
    const data = recordCreated;
    return data;
  } catch (err) {}
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
    const checkRecordExist = await recordModel.findOne({
      recordId: recordId,
    });
    if (!checkRecordExist) {
      throw Error("Routine Doesn't Exist");
    }
    //[x]: 3.5 verificar que el record sea propio del usuario
    if (checkRecordExist.userId !== userId) {
      throw Error("This Record Ain't Your own");
    }

    //[x]: 4. eliminamos el record.
    //? Se podra enviar algun dato ademas del codigo de respuesta al frontend?
    await recordModel.eraseById(recordId);
  } catch (err) {}
};

module.exports = { newRecord, myRecords, editRecord, editRecord, removeRecord };
