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
 * @returns //* Object de registro encontrado || undefined
 */
const search = async (keyToSearch, valueToSearch) => {
  try {
    const con = await getConnection();

    const query = `SELECT * FROM routine WHERE ${keyToSearch} = ?;`;
    const searchResult = await con.query(query, [valueToSearch]);
    return searchResult[0];
  } catch (err) {
    console.error(err);
  }
};

/**
 * > Busca todas las coincidencias usando el id de usuario
 * @param {id} userId
 * @returns //* Object List || undefined
 */
const acquire = async (userId) => {
  try {
    const con = await getConnection();

    const query = "SELECT * FROM `routine` WHERE userId = ?;";
    const dataCatched = await con.query(query, [userId]);
    return dataCatched;
  } catch (err) {}
};
/**
 * > Actualiza un registro usando el id del registro, no del usuario claramente
 * @param {Object: Routine} routineEntity
 */
const shift = async (routineEntity) => {
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
  } catch (err) {}
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
