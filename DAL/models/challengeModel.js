const {
  toEntity,
  toDto,
  toDtoList,
} = require("../converters/challengeConverter");

const {
  store,
  search,
  acquire,
  shift,
  removeOne,
} = require("../daos/challengeDao");

/**
 * > almacena entidad usando objeto con userId
 * @param {Object} challengeObject
 * @returns // * challengeId
 */
const add = (challengeObject) => {
  return new Promise((resolve, reject) => {
    const challengeEntity = toEntity(challengeObject);
    store(challengeEntity)
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
 * @param {Number} userId
 * @returns // * Array
 */
const find = (userId) => {
  return new Promise((resolve, reject) => {
    acquire(userId)
      .then(function (result) {
        const challengeArray = toDtoList(result);
        return resolve(challengeArray);
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
 * @returns // * Object: ChallengeDTO || undefinied
 */
const findOne = (object) => {
  return new Promise(async (resolve, reject) => {
    const objectKey = Object.keys(object)[0];
    const objectValue = object[objectKey];
    const searchResult = await search(objectKey, objectValue);
    if (searchResult !== undefined) {
      const challengeDto = toDto(searchResult);

      return resolve(challengeDto);
    }
    return resolve(searchResult);
  });
};

/**
 * > Actualiza registro enviando en parametro objeto con id del registro
 * @param {Object} challengeObject
 * @returns //* void
 */
const update = (challengeObject) => {
  return new Promise((resolve, reject) => {
    const challengeEntity = toEntity(challengeObject);
    shift(challengeEntity)
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
 * @param {Number} challengeId
 * @returns //* void
 */
const eraseById = (challengeId) => {
  return new Promise((resolve, reject) => {
    removeOne(challengeId)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = { add, find, findOne, update, eraseById };
