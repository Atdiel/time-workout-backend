// const con = require("../config/mysql");
const { getConnection } = require("../config/mysql");

/**
 * > Elimina de la BD un registro dando llave valor
 * @param {String} keyToRemove
 * @param {String || int} valueToRemove
 * @returns {Promise} void
 */
const remove = (keyToRemove, valueToRemove) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = `DELETE FROM favoriteWorkout WHERE ${keyToRemove} = ?;`;
      await con.query(query, [valueToRemove]);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { remove };
