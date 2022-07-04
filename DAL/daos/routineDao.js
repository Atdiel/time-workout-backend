// const con = require("../config/mysql");
const { getConnection } = require("../config/mysql");

/**
 * > Almacenar en la base de datos una entidad
 * @param {JSON} routineEntity
 * @returns {Promise} void
 */
const store = (routineEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const userId = routineEntity.userId;
      const tittle = routineEntity.tittle;
      const privacy = routineEntity.privacy;
      const description = routineEntity.description;
      const exercisesInfo = routineEntity.exercisesInfo;

      const query = `INSERT INTO routine (userId, tittle, privacy, description, exercisesInfo, timestamp) 
        VALUES (${userId}, "${tittle}", ${privacy}, "${description}", '${exercisesInfo}', CURRENT_DATE());`;

      await con.query(query);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Busca en la BD mediante llave-valor e.g. id: 153
 * @param {String} keyToSearch
 * @param {String || Number} valueToSearch
 * @returns {Promise<JSON>} routineEntity || undefined
 */
const search = (keyToSearch, valueToSearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = `SELECT * FROM routine WHERE ${keyToSearch} = ?;`;
      const searchResult = await con.query(query, [valueToSearch]);

      resolve(searchResult[0]);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Busca todas las coincidencias usando el id de usuario
 * @param {int} userId
 * @returns {Promise<Array<JSON>>} Object List || undefined
 */
const acquire = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = "SELECT * FROM `routine` WHERE userId = ?;";
      const dataCatched = await con.query(query, [userId]);
      resolve(dataCatched);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Actualiza un registro usando el id del registro, no del usuario claramente
 * @param {JSON} routineEntity
 * @returns {Promise} void
 */
const shift = (routineEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const routineId = routineEntity.routineId;
      const tittle = routineEntity.tittle;
      const privacy = routineEntity.privacy;
      const description = routineEntity.description;
      const exercisesInfo = routineEntity.exercisesInfo;

      const query =
        "UPDATE `routine` SET  `tittle` = ?, `privacy` = ?, `description` = ?, `exercisesInfo` = ? WHERE `routineId` = ?;";

      await con.query(query, [
        tittle,
        privacy,
        description,
        exercisesInfo,
        routineId,
      ]);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Elimina un registro de la DB usando id del registro
 * @param {id} routineId
 */
const removeOne = async (routineId) => {
  try {
    const con = await getConnection();

    const query = "DELETE FROM `routine` WHERE `routineId` = ?;";
    await con.query(query, [routineId]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { store, search, acquire, shift, removeOne };
