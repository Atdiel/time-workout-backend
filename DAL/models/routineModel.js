const {
  toEntity,
  toDto,
  toDtoList,
} = require("../converters/routineConverter");
const {
  store,
  search,
  acquire,
  shift,
  removeOne,
} = require("../daos/routineDao");

/**
 * > almacena entidad usando objeto con userId
 * @param {JSON} routineObject
 * @returns {Promise} void
 */
const add = (routineObject) => {
  return new Promise((resolve, reject) => {
    const routineEntity = toEntity(routineObject);
    store(routineEntity)
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
 * @returns {Promise<Array<JSON>>} routineDTO list
 */
const find = (userId) => {
  return new Promise((resolve, reject) => {
    acquire(userId)
      .then((result) => {
        const routineArray = toDtoList(result);
        return resolve(routineArray);
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
 * @returns {Promise<JSON>} RoutineDTO || undefinied
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
 * @param {JSON} routineObject
 * @returns {Promise} void
 */
const update = (routineObject) => {
  return new Promise((resolve, reject) => {
    const routineEntity = toEntity(routineObject);
    shift(routineEntity)
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
 * @param {int} routineId
 * @returns {Promise} void
 */
const eraseById = (routineId) => {
  return new Promise((resolve, reject) => {
    removeOne(routineId)
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = { add, find, findOne, update, eraseById };
