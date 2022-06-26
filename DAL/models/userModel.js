const { toEntity, toDto } = require("../converters/userConverter");
const { store, search, shift } = require("../daos/userDao");

/**
 * Se encarga de la logica de crear un nuevo registro de usuario
 * @param {Object} userObject
 * @returns {Promise}
 */
const add = (userObject) => {
  return new Promise((resolve, reject) => {
    // convertir el objeto a entidad
    const userEntity = toEntity(userObject);
    // almacenar en base de datos y recuperar el nuevo usuario
    store(userEntity).catch((error) => {
      return reject(error);
    });

    resolve();
  });
};

/**
 * Se encarga de la logica de traer un usario de la base de datos
 * @param {Object} object
 * @returns objeto DTO del usuario encontrado
 */
const findOne = (object) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Guardamos en constante la llave ej: { name: "Juan"} -> "name"
      const objectKey = Object.keys(object)[0];
      // Lo mismo de arriba pero solo con el valor -> "Juan"
      const objectValue = object[objectKey];
      // Usamos metodo @search de DAO para buscar el usuario.
      const searchResult = await search(objectKey, objectValue);
      // Convertimos la entidad que retorno el DAO en un DTO
      if (searchResult !== undefined) {
        const userDto = toDto(searchResult);

        resolve(userDto);
      } else {
        resolve(searchResult);
      }
    } catch (err) {
      reject(err);
    }
  });
};

const update = (userId, userObject) => {
  return new Promise((resolve, reject) => {
    const userEntity = toEntity(userObject);
    shift(userId, userEntity)
      .then(function () {
        return resolve();
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = { add, findOne, update };
