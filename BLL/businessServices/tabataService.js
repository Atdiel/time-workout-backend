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
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: creamos registro de la tabata con el id previamente obtenido.
      tabataData = { ...tabataData, userId: userId };
      await tabataModel.add(tabataData);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Service with the business logic
 * > in order to show tabatas from the user
 * @param {int} userId ID of the user.
 * @returns {Promise<Array<JSON>>} Array with tabatas DTOs in JSON format.
 */
const myTabatas = (userId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: buscar en la base de datos usuario por id.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: obtener las tabatas de la base de datos
      const userTabatasList = await tabataModel.find(userId);

      resolve(userTabatasList);
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Service with business logic
 * > in order to update a tabata from the user.
 * @param {int} userId ID of the user.
 * @param {int} tabataId ID of the tabata.
 * @param {JSON} tabataData tabata's DTO in format JSON.
 * @returns {Promise} void
 */
const editTabata = (userId, tabataId, tabataData) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista la tabata.
      const tabataExists = await tabataModel.findOne({
        tabataId: tabataId,
      });
      if (!tabataExists) {
        reject([null, "Tabata Doesn't Exist", 404]);
      }

      //COMMENT: actualizamos los datos de la tabata usando "tabataid".
      tabataData = { ...tabataData, tabataId: tabataId };
      await tabataModel.update(tabataData);

      //COMMENT: si es privado, borrar en registros de la tabla @favoriteWorkout.
      if (tabataData.privacy === true) {
        await favoriteWorkoutModel.erase({ tabataId: tabataId });
      }

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

/**
 * > Service with the business logic
 * > in order to delete a tabata.
 * @param {int} userId ID of the user.
 * @param {int} tabataId ID of the tabata from the user.
 */
const removeTabata = (userId, tabataId) => {
  return new Promise(async (resolve, reject) => {
    "use strict";
    try {
      //COMMENT: verificar que exista el usuario.
      const userExists = await userModel.findOne({ userId: userId });
      if (!userExists) {
        reject([null, "User Doesn't Exist", 404]);
      }

      //COMMENT: verificar que exista la tabata.
      const tabataExists = await tabataModel.findOne({ tabataId: tabataId });
      if (!tabataExists) {
        reject([null, "Tabata Doesn't Exist", 404]);
      }

      //COMMENT: eliminamos la tabata.
      await tabataModel.eraseById(tabataId);

      resolve();
    } catch (err) {
      reject([err]);
    }
  });
};

module.exports = { newTabata, myTabatas, editTabata, removeTabata };
