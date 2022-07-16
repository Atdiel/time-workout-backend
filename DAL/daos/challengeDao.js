// const con = require("../config/mysql");
const { getConnection } = require("../config/mysql");

/**
 * > Almacenar en la base de datos una entidad
 * @param {Object} challengeEntity
 * @returns {Object} - Object con challengeId
 */
const store = (challengeEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();
      const userId = challengeEntity.userId;
      const tittle = challengeEntity.tittle;
      const description = challengeEntity.description;
      const followers = challengeEntity.followers;
      const startDate = challengeEntity.startDate;
      const endDate = challengeEntity.endDate;
      const days = challengeEntity.days;

      const query = `INSERT INTO challenge (userId, tittle, description, followers, startDate, endDate, days, timestamp)
        VALUES (${userId}, "${tittle}", "${description}", ${followers}, "${startDate}", "${endDate}", '${days}', CURRENT_DATE());`;

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
const search = (keyToSearch, valueToSearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = `SELECT * FROM challenge WHERE ${keyToSearch} = ?;`;
      const searchResult = await con.query(query, [valueToSearch]);

      resolve(searchResult[0]);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Busca todas las coincidencias usando el id de usuario
 * @param {id} userId
 * @returns //* Object List || undefined
 */
const acquire = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = "SELECT * FROM `challenge` WHERE userId = ?;";
      const dataCatched = await con.query(query, [userId]);
      resolve(dataCatched);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Actualiza un registro usando el id del registro, no del usuario claramente
 * @param {Object: Challenge} challengeEntity
 */
const shift = (challengeEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const challengeId = challengeEntity.challengeId;
      const tittle = challengeEntity.tittle;
      const description = challengeEntity.description;
      const followers = challengeEntity.followers;
      const startDate = challengeEntity.startDate;
      const endDate = challengeEntity.endDate;
      const days = challengeEntity.days;

      const query =
        "UPDATE `challenge` SET  `tittle` = ?, `description` = ?, `followers` = ?, `startDate` = ?, `endDate` = ?, `days` = ? WHERE `challengeId` = ?;";

      await con.query(query, [
        tittle,
        description,
        followers,
        startDate,
        endDate,
        days,
        challengeId,
      ]);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Elimina un registro de la DB usando id del registro
 * @param {Number} challengeId
 */
const removeOne = (challengeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query =
        "DELETE `favoriteWorkout`, `challenge` FROM `favoriteWorkout` LEFT JOIN `challenge` ON (favoriteWorkout.challengeId = challenge.challengeId) WHERE challenge.challengeId = ?;";
      await con.query(query, [challengeId]);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { store, search, acquire, shift, removeOne };
