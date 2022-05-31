const con = require("../config/mysql");

/**
 * > Almacenar en la base de datos una entidad
 * @param {Object: Record} recordEntity
 * @returns //* Object con recordId
 */
const store = (recordEntity) => {
  return new Promise(async (resolve, reject) => {
    const userId = recordEntity.userId;
    const tittle = recordEntity.tittle;
    const description = recordEntity.description;
    const recordTable = recordEntity.recordTable;

    const query = `INSERT INTO record (userId, tittle, description, recordTable, timestamp) 
        VALUES (${userId}, "${tittle}", "${description}", '${recordTable}', CURRENT_DATE());`;

    const resultDB = await con.query(query);
    resolve(resultDB);
  });
};

/**
 * > Busca en la BD mediante llave-valor e.g. id: 153
 * @param {String} keyToSearch
 * @param {String || Number} valueToSearch
 * @returns //* Object de registro encontrado (solo uno) || undefined
 */
const search = async (keyToSearch, valueToSearch) => {
  try {
    const query = `SELECT * FROM record WHERE ${keyToSearch} = ?;`;
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
    const query = "SELECT * FROM `record` WHERE userId = ?;";
    const dataCatched = await con.query(query, [userId]);
    return dataCatched;
  } catch (err) {}
};

/**
 * > Actualiza un registro usando el id del registro, no del usuario claramente
 * @param {Object: Record} recordEntity
 * @returns //* void
 */
const shift = async (recordEntity) => {
  try {
    console.log(recordEntity);
    const recordId = recordEntity.recordId;
    const tittle = recordEntity.tittle;
    const description = recordEntity.description;
    const recordTable = recordEntity.recordTable;

    const query =
      "UPDATE `record` SET  `tittle` = ?, `description` = ?, `recordTable` = ? WHERE `recordId` = ?;";

    await con.query(query, [tittle, description, recordTable, recordId]);
  } catch (err) {
    console.log(err);
  }
};

/**
 * > Elimina un registro de la DB usando id del registro
 * @param {id} recordId
 */
const removeOne = async (recordId) => {
  try {
    const query = "DELETE FROM `record` WHERE `recordId` = ?;";
    await con.query(query, [recordId]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { store, search, acquire, shift, removeOne };
