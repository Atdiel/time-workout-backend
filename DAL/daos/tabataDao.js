// const con = require("../config/mysql");
const { getConnection } = require("../config/mysql");

/**
 * > create a new tabata's log in the database
 * @param {JSON} tabataEntity Tabata Entity in JSON format.
 * @returns {Promise} void
 */
const store = (tabataEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const userId = tabataEntity.userId;
      const tittle = tabataEntity.tittle;
      const privacy = tabataEntity.privacy;
      const description = tabataEntity.description;
      const effortTime = tabataEntity.effortTime;
      const rounds = tabataEntity.rounds;
      const restTime = tabataEntity.restTime;
      const exercises = tabataEntity.exercises;

      const query = `INSERT INTO tabata (userId, tittle, privacy, description, effortTime, rounds, restTime, exercises, timestamp) 
      VALUES (${userId}, "${tittle}", ${privacy}, "${description}", ${effortTime}, ${rounds}, ${restTime}, '${exercises}', CURRENT_DATE());`;
      await con.query(query);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > find and return only one tabata log from the user.
 * @param {String} keyToSearch The name of the field in the\
 *                               table of the database.
 * @param {any} valueToSearch The value to search.
 * @returns {Promise<JSON>} Tabata Entity in JSON format.
 */
const search = (keyToSearch, valueToSearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = `SELECT * FROM tabata WHERE ${keyToSearch} = ?;`;
      const searchResult = await con.query(query, [valueToSearch]);

      resolve(searchResult[0]);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Get all the tabata's logs from an user.
 * @param {int} userId ID of the user.
 * @returns {Promise<Array<JSON>>} Array with tabata's entities in format JSON
 */
const acquire = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const query = "SELECT * FROM `tabata` WHERE userId = ?;";
      const dataCatched = await con.query(query, [userId]);

      resolve(dataCatched);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Update a tabata log from an user.
 * @param {JSON} tabataEntity Tabata entity in JSON format.
 * @returns {Promise} void
 */
const shift = (tabataEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      const tabataId = tabataEntity.tabataId;
      const tittle = tabataEntity.tittle;
      const privacy = tabataEntity.privacy;
      const description = tabataEntity.description;
      const effortTime = tabataEntity.effortTime;
      const rounds = tabataEntity.rounds;
      const restTime = tabataEntity.restTime;
      const exercises = tabataEntity.exercises;

      const query =
        "UPDATE `tabata` SET  `tittle` = ?, `privacy` = ?, `description` = ?, `effortTime` = ?, `rounds` = ?, `restTime` = ?, `exercises` = ? WHERE `tabataId` = ?;";

      await con.query(query, [
        tittle,
        privacy,
        description,
        effortTime,
        rounds,
        restTime,
        exercises,
        tabataId,
      ]);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const removeOne = async (tabataId) => {
  try {
    const con = await getConnection();

    const query = "DELETE FROM `tabata` WHERE `tabataId` = ?;";
    await con.query(query, [tabataId]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { store, search, acquire, shift, removeOne };
