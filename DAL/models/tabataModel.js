const { toEntity, toDto, toDtoList } = require("../converters/tabataConverter");
const {
  store,
  search,
  acquire,
  shift,
  removeOne,
} = require("../daos/tabataDao");

/**
 * > Convierte json en entidad para luego almacenar en BD
 * @param {JSON} tabataObject Tabata JSON object
 * @returns {Promise} void
 */
const add = (tabataObject) => {
  return new Promise((resolve, reject) => {
    const tabataEntity = toEntity(tabataObject);
    store(tabataEntity)
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

/**
 * > Devuelve todos los resultados por userId
 * @param {int} userId ID of the user.
 * @returns {Promise<Array<JSON>>} Array with tabata's DTOs in format JSON
 */
const find = (userId) => {
  return new Promise((resolve, reject) => {
    acquire(userId)
      .then((result) => {
        const tabataArray = toDtoList(result);
        return resolve(tabataArray);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

/**
 * > La llave del objeto debe tener el mismo nombre que
 * > la columna de la base de datos
 * > e.g. {id: 128937}
 * @param {JSON} object The object with the key as the field\
 *                      and the value as the value to search\
 *                      in the DB.
 * @returns {Promise<JSON>} Tabata DTO in format JSON finded.
 */
const findOne = (object) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectKey = Object.keys(object)[0];
      const objectValue = object[objectKey];
      const searchResult = await search(objectKey, objectValue);
      searchResult === undefined
        ? resolve(searchResult)
        : resolve(toDto(searchResult));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > convert DTO to entity, then it will send to DAO.
 * @param {JSON} tabataObject Tabata DTO in JSON format.
 * @returns {Promise} void
 */
const update = (tabataObject) => {
  return new Promise((resolve, reject) => {
    const tabataEntity = toEntity(tabataObject);
    shift(tabataEntity)
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const eraseById = (tabataId) => {
  return new Promise((resolve, reject) => {
    removeOne(tabataId)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = { add, find, findOne, update, eraseById };
