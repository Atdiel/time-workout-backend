const {
  userModel,
  routineModel,
  favoriteWorkoutModel,
} = require("../../DAL/models");

/**
 * > Servicio con reglas de negocio para crear
 * > un registro en la base de datos
 * @param {int} userId
 * @param {JSON} routineData
 * @returns {Promise} void
 */
const newRoutine = (userId, routineData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: creamos registro de la routine con el "userId".
      routineData = { ...routineData, userId: userId };
      await routineModel.add(routineData);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para listar
 * > todos los registros de un usario.
 * @param {int} userId
 * @returns {Promise<Array<JSON>>} RoutineDTO
 */
const myRoutines = (userId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar en la base de datos usuario por id.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: obtener las rutinas de la base de datos.
      const userRoutineList = await routineModel.find(userId);

      resolve(userRoutineList);
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para editar
 * > un registro de un usuario en la base de datos
 * @param {int} userId
 * @param {int} routineId
 * @param {JSON} routineData
 * @returns {Promise} void
 */
const editRoutine = (userId, routineId, routineData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista la rutina.
      const routineExists = await routineModel.findOne({
        routineId: routineId,
      });
      if (!routineExists) {
        reject([null, "Routine Doesn't Exist", 404]);
      }

      //COMMENT: verificar que la routine sea propia del usuario.
      if (routineExists.userId !== userId) {
        reject([null, "This Routine Ain't Your Own", 403]);
      }

      //COMMENT: actualizamos los datos de la tabata usando "routineid".
      routineData = { ...routineData, routineId: routineId };
      await routineModel.update(routineData);

      //COMMENT: si es privado, borrar el registro en la tabla @favoriteWorkout
      if (routineData.privacy === true) {
        await favoriteWorkoutModel.erase({ routineId: routineId });
      }

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para eliminar
 * > un registro de un usuario en la base de datos
 * @param {int} userId
 * @param {int} routineId
 * @returns {Promise} void
 */
const removeRoutine = (userId, routineId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista la rutina.
      const routineExists = await routineModel.findOne({
        routineId: routineId,
      });
      if (!routineExists) {
        reject([null, "Routine Doesn't Exist", 404]);
      }

      //COMMENT: verificar que la rutina sea propia del usuario.
      if (routineExists.userId !== userId) {
        reject([null, "This Routine Ain't Your Own", 403]);
      }

      //COMMENT: eliminamos la rutina.
      await routineModel.eraseById(routineId);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

module.exports = { newRoutine, myRoutines, editRoutine, removeRoutine };
