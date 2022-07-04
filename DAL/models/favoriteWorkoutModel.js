const { remove } = require("../daos/favoriteWorkoutDao");

/**
 * > Elimina de la base de datos usando llave-valor
 * @param {Object} object
 * @returns {Promise} void
 */
const erase = (object) => {
  return new Promise((resolve, reject) => {
    try {
      const objectKey = Object.keys(object)[0];
      const objectValue = object[objectKey];
      remove(objectKey, objectValue)
        .then(() => {
          return resolve();
        })
        .catch((error) => {
          return reject(error);
        });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { erase };
