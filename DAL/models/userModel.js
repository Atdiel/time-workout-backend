const { toEntity, toDto } = require("../converters/userConverter");
const { store, search, shift } = require("../daos/userDao");

/**
 * Se encarga de la logica de crear un nuevo registro de usuario
 * @param {*} userObject el objeto usuario
 * @returns el objeto del usuario creado
 */
const add = (userObject) => {
  return new Promise((resolve, reject) => {
    // convertir el objeto a entidad
    const userEntity = toEntity(userObject);
    // almacenar en base de datos y recuperar el nuevo usuario
    store(userEntity).catch(function (error) {
      return reject(error);
    });

    resolve();
  });
};

/**
 * Se encarga de la logica de traer un usario de la base de datos
 * @param {*objeto js con solo una no anidada llave-valor} object
 * @returns objeto DTO del usuario encontrado
 */
const findOne = async (object) => {
  // Guardamos en constante la llave ej: { name: "Juan"} -> "name"
  const objectKey = Object.keys(object)[0];
  // Lo mismo de arriba pero solo con el valor -> "Juan"
  const objectValue = object[objectKey];
  // Usamos metodo @search de DAO para buscar el usuario.
  const searchResult = await search(objectKey, objectValue);
  // Convertimos la entidad que retorno el DAO en un DTO
  if (searchResult !== undefined) {
    const userDto = toDto(searchResult);

    return userDto;
  }
  return searchResult;
};

const update = async (userId, userObject) => {
  return new Promise((resolve, reject) => {
    const userEntity = toEntity(userObject);
    shift(userId, userEntity).catch(function (error) {
      return reject(error);
    });
    resolve();
  });
};

module.exports = { add, findOne, update };
