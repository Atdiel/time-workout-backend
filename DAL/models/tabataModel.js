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
 * @param {Object} tabataObject
 * @returns // * tabataId
 */
const add = (tabataObject) => {
  return new Promise((resolve, reject) => {
    const tabataEntity = toEntity(tabataObject);
    store(tabataEntity)
      .then(function (result) {
        const tabataIdCreated = result.insertId;
        return resolve(tabataIdCreated);
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

/**
 * > Devuelve todos los resultados por userId
 * @param {Number} userId
 * @returns // * Array
 */
const find = (userId) => {
  return new Promise((resolve, reject) => {
    acquire(userId)
      .then(function (result) {
        const tabataArray = toDtoList(result);
        return resolve(tabataArray);
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

/**
 * > La llave del objeto debe tener el mismo nombre que
 * > la columna de la base de datos
 * > e.g. {id: 128937}
 * @param {Object} object
 * @returns // * Object @class TabataDto || undefinied
 */
const findOne = (object) => {
  return new Promise(async (resolve, reject) => {
    const objectKey = Object.keys(object)[0];
    const objectValue = object[objectKey];
    const searchResult = await search(objectKey, objectValue);
    if (searchResult !== undefined) {
      const tabataDto = toDto(searchResult);

      return resolve(tabataDto);
    }
    return resolve(searchResult);
  });
};

const update = (tabataObject) => {
  return new Promise((resolve, reject) => {
    const tabataEntity = toEntity(tabataObject);
    shift(tabataEntity)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
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
