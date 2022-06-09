// const con = require("../config/mysql");
const { getConnection } = require("../config/mysql");

/**
 * > Almacenar en la base de datos una entidad
 * @param {Object: Challenge} challengeEntity
 * @returns //* Object con challengeId
 */
const store = (challengeEntity) => {
  return new Promise(async (resolve, reject) => {
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

    const resultDB = await con.query(query);
    resolve(resultDB);
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

    const query = `SELECT * FROM challenge WHERE ${keyToSearch} = ?;`;
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

    const query = "SELECT * FROM `challenge` WHERE userId = ?;";
    const dataCatched = await con.query(query, [userId]);
    return dataCatched;
  } catch (err) {}
};
/**
 * > Actualiza un registro usando el id del registro, no del usuario claramente
 * @param {Object: Challenge} challengeEntity
 */
const shift = async (challengeEntity) => {
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
  } catch (err) {}
};

/**
 * > Elimina un registro de la DB usando id del registro
 * @param {Number} challengeId
 */
const removeOne = async (challengeId) => {
  try {
    const con = await getConnection();

    const query = "DELETE FROM `challenge` WHERE `challengeId` = ?;";
    await con.query(query, [challengeId]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { store, search, acquire, shift, removeOne };
