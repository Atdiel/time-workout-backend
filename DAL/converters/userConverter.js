const User = require("../pojos/userEntity");
const UserDto = require("../dtos/userDto");

/**
 * Crea un objeto de @class User modificando el objeto creado por el usuario
 * @param {*} userDto objeto que viene desde el input del usuario
 * @returns @class User (pojo o entity)
 */
const toEntity = (userDto) => {
  let {
    name,
    lastName,
    password,
    email,
    gender,
    birthday,
    profilePicture,
    nationality,
  } = userDto;

  /**
   *
   * antes de convertir en entidad debemos asegurarmos como queremos
   * almacenar los datos, haciendo claro unos ajustes al input del usuario
   */

  // mediante split, map y join corregimos el "noMbrE UsuaRiO" -> "Nombre Usuario"
  name = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // the same as above
  lastName = lastName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // genero solo debe ser mayuscula ["M", "F"]
  gender = gender.toUpperCase();

  //the same as above
  nationality = nationality.toUpperCase();

  /**
   *
   *
   * Se crea la entidad con su Constructor.
   */
  userEntity = new User(
    undefined,
    name,
    lastName,
    password,
    email,
    gender,
    birthday,
    profilePicture,
    nationality
  );

  return userEntity;
};

const toDto = (userEntity) => {
  let {
    userId,
    name,
    lastName,
    password,
    email,
    gender,
    birthday,
    profilePicture,
    nationality,
    timestamp,
  } = userEntity;
};

module.exports = { toEntity };
