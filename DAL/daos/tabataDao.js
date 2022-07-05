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

const search = async (keyToSearch, valueToSearch) => {
  try {
    const con = await getConnection();

    const query = `SELECT * FROM tabata WHERE ${keyToSearch} = ?;`;
    const searchResult = await con.query(query, [valueToSearch]);
    return searchResult[0];
  } catch (err) {
    console.error(err);
  }
};

const acquire = async (userId) => {
  try {
    const con = await getConnection();

    const query = "SELECT * FROM `tabata` WHERE userId = ?;";
    const dataCatched = await con.query(query, [userId]);
    return dataCatched;
  } catch (err) {}
};

const shift = async (tabataEntity) => {
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
  } catch (err) {}
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
