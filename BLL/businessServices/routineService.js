const {
  userModel,
  routineModel,
  favoriteWorkoutModel,
} = require("../../DAL/models");

/**
 * > Servicio con reglas de negocio para crear
 * > un registro en la base de datos
 * @param {Number} userId
 * @param {JSON} routineData
 * @returns //* Object: RoutineDTO
 */
const newRoutine = async (userId, routineData) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. buscar que exista el usuario.
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. creamos registro de la routine con el "userId" previamente obtenido.
    routineData = { ...routineData, userId: userId };
    const routineIdCreated = await routineModel.add(routineData);

    //[x]: 4. respondemos con la routine recien creada.
    //! IMPORTANTE MANDAR EL OBJETO JSON PARA QUE EL FRONTEND TENGA CONOCIMIENTO DEL ID DE RUTINA
    const routineCreated = await routineModel.findOne({
      routineId: routineIdCreated,
    });
    const data = { ...routineCreated };
    return data;
  } catch (err) {}
};

/**
 * > Servicio con reglas de negocio para listar
 * > todos los registros de un usario.
 * @param {Number} userId
 * @returns //* Array: RoutineDTO
 */
const myRoutines = async (userId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. buscar en la base de datos usuario por id.
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
      throw Error("User Doesn't Exist");
    }

    //[x]: 3. obtener las rutinas de la base de datos.
    //! EL DTO ROUTINE CONVERTIRA EL RESULTADO DE LA DB A UNA LISTA CON OBJETOS JSON
    const userRoutineList = await routineModel.find(userId);

    //[x]: 4. mandar al frontend el resultado.
    const data = userRoutineList;
    return data;
  } catch (err) {}
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
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
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
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
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
