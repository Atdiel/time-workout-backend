const con = require("../config/mysql");
const User = require("../pojos/userEntity");

/**
 * Mandar por parametro la @class entidad (pojo)
 * @param {*} userEntity
 * @returns una promesa con el objeto de usuario almacenado
 */
const store = async (userEntity) => {
  try {
    // Primero dividimos todas las propiedades de @userEntity en constantes
    const name = userEntity.name;
    const lastName = userEntity.lastName;
    const password = userEntity.password;
    const email = userEntity.email;
    const gender = userEntity.gender;
    const birthday = userEntity.birthday;
    const profilePicture = userEntity.profilePicture;
    const nationality = userEntity.nationality;

    // Verificamos si ya se registro el email
    console.log("antes del check");
    let checkExist = await con.query("SELECT * FROM user WHERE email=?", [
      email,
    ]);
    console.log("luego del check");
    // Si tiene contenido @checkExist mandamos un error
    if (checkExist[0]) {
      throw Error("Este Correo ya se a registrado");
    } else {
      // verificamos que exista el atributo @profilePicture para evitar errores
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

      // obtenemos y @return el usuario recien creado
      let user = await con.query("SELECT * FROM user WHERE email=?", [email]);
      // no sin antes crear la entidad @class User
      user = user[0];
      const userEntity = new User(
        user.userId,
        user.name,
        user.lastName,
        user.password,
        user.email,
        user.gender,
        user.birthday,
        user.profilePicture,
        user.nationality,
        user.timestamp
      );
      console.log("antes");
      console.log(userEntity);
      return userEntity;
    }
  } catch (err) {
    throw Error(err);
  }
};

module.exports = { store };
