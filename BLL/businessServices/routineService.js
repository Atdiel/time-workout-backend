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
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: creamos registro de la routine con el "userId".
      routineData = { ...routineData, userId: userId };
      await routineModel.add(routineData);

      resolve();
    } catch (err) {
      reject(["Error del Servidor", err]);
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
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: obtener las rutinas de la base de datos.
      const userRoutineList = await routineModel.find(userId);

      resolve(userRoutineList);
    } catch (err) {
      reject(["Error del Servidor", err]);
    }
  });
};

/**
 * > Servicio con reglas de negocio para editar
 * > un registro de un usuario en la base de datos
 * @param {Number} userId
 * @param {Number} routineId
 * @param {JSON} routineData
 * @returns //* Object: RoutineDTO
 */
const editRoutine = async (userId, routineId, routineData) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. verificar que exista la rutina.
    const checkRoutineExist = await routineModel.findOne({
      routineId: routineId,
    });
    if (!checkRoutineExist) {
      throw Error("Routine Doesn't Exist");
    }
    //[x]: 3.5 verificar que la routine sea propia del usuario.
    if (checkRoutineExist.userId !== userId) {
      throw Error("This Routine Ain't Your Own");
    }

    //[x]:  4. actualizamos los datos de la tabata usando "routineid".
    routineData = { ...routineData, routineId: routineId };
    await routineModel.update(routineData);

    //[x]: 5. si el campo de "privacy" es privado, borrar en registros de la tabla @favoriteWorkout donde el "routineId" sea la actualizada
    if (routineData.privacy === true) {
      await favoriteWorkoutModel.erase({ routineId: routineId });
    }

    //[x]: 6. devolvemos la rutina recien actualizada.
    const routineCreated = await routineModel.findOne({ routineId: routineId });
    const data = routineCreated;
    return data;
  } catch (err) {}
};

/**
 * > Servicio con reglas de negocio para eliminar
 * > un registro de un usuario en la base de datos
 * @param {Number} userId
 * @param {Number} routineId
 */
const removeRoutine = async (userId, routineId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. verificar que exista la rutina.
    const checkRoutineExist = await routineModel.findOne({
      routineId: routineId,
    });
    if (!checkRoutineExist) {
      throw Error("Routine Doesn't Exist");
    }
    //[x]: 3.5 verificar que la rutina sea propia del usuario.
    if (checkRoutineExist.userId !== userId) {
      throw Error("This Routine Ain't Your Own");
    }

    //[x]: 4. eliminamos la rutina.
    //? Se podra enviar algun dato ademas del codigo de respuesta al frontend?
    await routineModel.eraseById(routineId);
  } catch (err) {}
};

module.exports = { newRoutine, myRoutines, editRoutine, removeRoutine };
