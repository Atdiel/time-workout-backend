const con = require("../config/mysql");
const User = require("../pojos/userEntity");

/**
 * Mandar por parametro la @class entidad (pojo)
 * @param {*} userEntity
 * @returns una promesa con el objeto de usuario almacenado
 */
const store = (userEntity) => {
  return new Promise(async (resolve, reject) => {
    // Primero dividimos todas las propiedades de @userEntity en constantes
    const name = userEntity.name;
    const lastName = userEntity.lastName;
    const password = userEntity.password;
    const email = userEntity.email;
    const gender = userEntity.gender;
    const birthday = userEntity.birthday;
    const profilePicture = userEntity.profilePicture;
    const nationality = userEntity.nationality;

    // verificamos que exista el atributo @profilePicture para evitar errores
    //FIXME: Siempre pasar por la request el valor de @profilePicture
    if (!profilePicture) {
      await con.query(
        "INSERT INTO `user` (`name`, `lastname`, `password`, `email`, `gender`, `birthday`, `profilePicture`, `nationality`, `timestamp`) VALUES ( ?, ?, ?, ?, ?, DATE(?), NULL, ?, CURRENT_DATE());",
        [name, lastName, password, email, gender, birthday, nationality]
      );
    } else {
      await con.query(
        "INSERT INTO `user` (`name`, `lastname`, `password`, `email`, `gender`, `birthday`, `profilePicture`, `nationality`, `timestamp`) VALUES (?, ?, ?, ?, ?, DATE(?), ?, ?,CURRENT_DATE());",
        [
          name,
          lastName,
          password,
          email,
          gender,
          birthday,
          profilePicture,
          nationality,
        ]
      );
    }

    resolve();
  });
};

const search = async (keyToSearch, valueToSearch) => {
  try {
    const query = `SELECT * FROM user WHERE ${keyToSearch} = ?;`;
    const searchResult = await con.query(query, [valueToSearch]);
    return searchResult[0];
  } catch (err) {
    console.error(err);
  }
};

const shift = (userId, userEntity) => {
  return new Promise(async (resolve, reject) => {
    // Primero dividimos todas las propiedades de @userEntity en constantes
    const name = userEntity.name;
    const lastName = userEntity.lastName;
    const password = userEntity.password;
    const email = userEntity.email;
    const gender = userEntity.gender;
    const birthday = userEntity.birthday;
    const profilePicture = userEntity.profilePicture;
    const nationality = userEntity.nationality;

    // verificamos que exista el atributo @profilePicture para evitar errores
    //FIXME: Siempre pasar por la request el valor de @profilePicture
    if (!profilePicture) {
      await con.query(
        //UPDATE `user` SET `name` = ?, `lastname` = ?, `password` = ?, `email` = ?, `gender` = ?, `birthday` = ?, `nationality` = ?, WHERE `userId` = ?;
        "UPDATE `user` SET `name` = ?, `lastname` = ?, `password` = ?, `email` = ?, `gender` = ?, `birthday` = ?, `nationality` = ? WHERE `userId` = ?;",
        [name, lastName, password, email, gender, birthday, nationality, userId]
      );
    } else {
      await con.query(
        "UPDATE `user` SET `name` = ?, `lastname` = ?, `password` = ?, `email` = ?, `gender` = ?, `birthday` = ?, `profilePicture` = ?, `nationality` = ? WHERE `userId` = ?;",
        [
          name,
          lastName,
          password,
          email,
          gender,
          birthday,
          profilePicture,
          nationality,
          userId,
        ]
      );
    }

    resolve();
  });
};
module.exports = { store, search, shift };
