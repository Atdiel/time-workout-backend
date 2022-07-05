const {
  userModel,
  tabataModel,
  favoriteWorkoutModel,
} = require("../../DAL/models");

/**
 * > Service with the business logic
 * > for the tabata creation.
 * @param {int} userId ID of the user.
 * @param {JSON} tabataData Object with tabata information
 * @returns {Promise} void
 */
const newTabata = (userId, tabataData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificamos que el usuario exista.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: creamos registro de la tabata con el id previamente obtenido.
      tabataData = { ...tabataData, userId: userId };
      await tabataModel.add(tabataData);

      resolve();
    } catch (err) {
      reject(["Error del Servidor", err]);
    }
  });
};

/**
 * > Service with the business logic
 * > in order to show tabatas from the user
 * @param {int} userId ID of the user.
 * @returns {Promise} void
 */
const myTabatas = (userId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar en la base de datos usuario por id.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject(["User Doesn't Exist", null]);
      }

      //COMMENT: obtener las tabatas de la base de datos
      const userTabatasList = await tabataModel.find(userId);

      resolve(userTabatasList);
    } catch (err) {
      reject(["Error del Servidor", err]);
    }
  });
};

const editTabata = async (userId, tabataId, tabataData) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }
    //[x]: 3. verificar que exista la tabata.
    const checkTabataExist = await tabataModel.findOne({ tabataId: tabataId });
    if (!checkTabataExist) {
      throw Error("Tabata Doesn't Exist");
    }
    //[x]: 4. actualizamos los datos de la tabata usando "tabataid".
    tabataData = { ...tabataData, tabataId: tabataId };
    await tabataModel.update(tabataData);
    console.log(tabataData);
    //[x]:  5. si el campo de "privacy" es privado, borrar en registros de la tabla @favoriteWorkout donde el "tabataId" sea la actualizada
    if (tabataData.privacy === true) {
      //[x]: implementar favoriteWorkoutModel para realizar esta funcion.
      await favoriteWorkoutModel.erase({ tabataId: tabataId });
    }

    //[x]: 6. devolvemos la tabata recien actualizada.
    const data = await tabataModel.findOne({ tabataId: tabataId });

    return data;
  } catch (err) {}
};

const removeTabata = async (userId, tabataId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const userExists = await userModel.findOne({ userId: userId });
    if (!userExists) {
      throw Error("User Doesn't Exist");
    }
    //[x]: 3. verificar que exista la tabata.
    const checkTabataExist = await tabataModel.findOne({ tabataId: tabataId });
    if (!checkTabataExist) {
      console.log("error");
      throw Error("Tabata Doesn't Exist");
    }
    //[x]: 4. eliminamos la tabata.
    await tabataModel.eraseById(tabataId);
    //? Se podra enviar algun dato ademas del codigo de respuesta al frontend?
  } catch (err) {}
};

module.exports = { newTabata, myTabatas, editTabata, removeTabata };
