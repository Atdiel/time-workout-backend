const { toEntity } = require("../converters/userConverter");
const { store } = require("../daos/userDao");

/**
 * Se encarga de la logica de crear un nuevo registro de usuario
 * @param {*} userObject el objeto usuario
 * @returns el objeto del usuario creado
 */
const create = (userObject) => {
  // convertir el objeto a entidad
  const userEntity = toEntity(userObject);
  // almacenar en base de datos y recuperar el nuevo usuario
  const userCreated = store(userEntity)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw new Error(error);
    });

  // userCreated = toDto(userCreated);
  console.log(userCreated);
  return userCreated;
};

module.exports = { create };
