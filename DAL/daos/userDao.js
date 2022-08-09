// const con = require("../config/mysql");
const { getConnection } = require("../config/mysql");

/**
 * Mandar por parametro la @class entidad (pojo)
 * @param {*} userEntity
 * @returns una promesa con el objeto de usuario almacenado
 */
const store = (userEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

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
    } catch (err) {
      reject(err);
    }
  });
};

const search = (keyToSearch, valueToSearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();
      const query = `SELECT * FROM user WHERE ${keyToSearch} = ?;`;
      const searchResult = await con.query(query, [valueToSearch]);
      resolve(searchResult[0]);
    } catch (err) {
      reject(err);
    }
  });
};

const shift = (userId, userEntity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await getConnection();

      // Primero dividimos todas las propiedades de @userEntity en constantes
      const name = userEntity.name;
      const lastName = userEntity.lastName;
      const password = userEntity.password;
      const email = userEntity.email;
      const gender = userEntity.gender;
      const birthday = userEntity.birthday;
      const profilePicture = userEntity.profilePicture;
      const nationality = userEntity.nationality;

      let values = [
        name,
        lastName,
        password,
        email,
        gender,
        birthday,
        profilePicture,
        nationality,
      ];

      values = values.filter((value) => {
        return value !== undefined;
      });

      let query = `UPDATE user SET ${name ? "name = ?" : ""}${
        lastName ? "lastname = ?" : ""
      }${password ? "password = ?," : ""}${email ? "email = ?," : ""}${
        gender ? "gender = ?," : ""
      }${birthday ? "birthday = ?," : ""}${
        profilePicture ? "profilePicture = ?," : ""
      }${nationality ? "nationality = ?" : ""} WHERE userId = ?;`;

      query = query.split(",");
      for (let i = 0; i < values.length - 1; i++) {
        query[i] = query[i] + ",";
      }
      query = query.join(" ");

      values.push(userId);
      await con.query(query, values);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { store, search, shift };
