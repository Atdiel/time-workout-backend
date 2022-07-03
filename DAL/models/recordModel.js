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
 * @returns {Promise}
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
 * @param {Id: Number} userId
 * @returns {Promise<Array<JSON>>}
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
 * @param {Object} object
 * @returns // * Object class RecordDTO || undefinied
 */
const findOne = (object) => {
  return new Promise(async (resolve, reject) => {
    const objectKey = Object.keys(object)[0];
    const objectValue = object[objectKey];
    const searchResult = await search(objectKey, objectValue);
    if (searchResult !== undefined) {
      const recordDto = toDto(searchResult);

      return resolve(recordDto);
    }
    return resolve(searchResult);
  });
};

/**
 * > Actualiza registro enviando en parametro objeto con id del registro
 * @param {Object} recordObject
 * @returns //* void
 */
const update = (recordObject) => {
  return new Promise((resolve, reject) => {
    const recordEntity = toEntity(recordObject);
    shift(recordEntity)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

/**
 * > Elimina registro solo con su id
 * @param {Id: Number} recordId
 * @returns //* void
 */
const eraseById = (recordId) => {
  return new Promise((resolve, reject) => {
    removeOne(recordId)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = { add, find, findOne, update, eraseById };
