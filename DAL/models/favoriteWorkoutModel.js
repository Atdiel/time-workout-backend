const { remove } = require("../daos/favoriteWorkoutDao");

/**
 * > Elimina de la base de datos usando llave-valor
 * @param {Object} object
 * @returns // * void
 */
const erase = (object) => {
  return new Promise((resolve, reject) => {
    const objectKey = Object.keys(object)[0];
    const objectValue = object[objectKey];
    remove(objectKey, objectValue)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = { erase };
