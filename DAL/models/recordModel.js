const {
  store,
  search,
  acquire,
  shift,
  removeOne,
} = require("../daos/recordDao");
const { toEntity, toDto, toDtoList } = require("../converters/recordConverter");

/**
 * > almacena entidad usando objeto con userId
 * @param {JSON} recordObject
 * @returns {Promise} void
 */
const add = (recordObject) => {
  return new Promise((resolve, reject) => {
    const recordEntity = toEntity(recordObject);
    store(recordEntity)
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
 * @param {int} userId
 * @returns {Promise<Array<JSON>>} Record list
 */
const find = (userId) => {
  return new Promise((resolve, reject) => {
    acquire(userId)
      .then((result) => {
        const recordArray = toDtoList(result);
        return resolve(recordArray);
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
 * @param {JSON} object
 * @returns {Promise<JSON>} RecordDTO || undefinied
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
 * > Actualiza registro enviando en parametro objeto con id del registro
 * @param {Object} recordObject
 * @returns {Promise} void
 */
const update = (recordObject) => {
  return new Promise((resolve, reject) => {
    const recordEntity = toEntity(recordObject);
    shift(recordEntity)
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

/**
 * > Elimina registro solo con su id
 * @param {int} recordId
 * @returns {Promise} void
 */
const eraseById = (recordId) => {
  return new Promise((resolve, reject) => {
    removeOne(recordId)
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = { add, find, findOne, update, eraseById };
