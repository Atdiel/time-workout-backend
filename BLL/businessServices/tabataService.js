const { userModel, tabataModel } = require("../../DAL/models");

const newTabata = async (userId, tabataData) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. buscar que exista el usuario.
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
      throw Error("User Doesn't Exist");
    }
    //TODO: 3. creamos registro de la tabata con el id previamente obtenido.
    const tabataCreated = await tabataModel.add(userId, tabataData);
    //TODO: 4. respondemos con la tabata recien creada.
    //! IMPORTANTE MANDAR EL OBJETO JSON PARA QUE EL FRONTEND TENGA CONOCIMIENTO DEL ID DE TABATA
    const data = { ...tabataCreated, userId: undefined };
    return data;
  } catch (err) {
    throw err.message;
  }
};

const myTabatas = async (userId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. buscar en la base de datos usuario por id.
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
      throw Error("User Doesn't Exist");
    }
    //TODO: 3. obtener las tabatas de la base de datos
    // ! EL DTO TABATA CONVERTIRA EL RESULTADO DE LA DB A UNA LISTA CON OBJETOS JSON
    const userTabatas = await tabataModel.find(userId);
    //TODO: 4. mandar al frontend el resultado.
    const data = userTabatas;
    return data;
  } catch (err) {}
};

const editTabata = async (userId, tabataId, tabataData) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
      throw Error("User Doesn't Exist");
    }
    //TODO: 3. verificar que exista la tabata.
    const checkTabataExist = await tabataModel.findOne({ tabataId: tabataId });
    if (!checkTabataExist) {
      throw Error("Tabata Doesn't Exist");
    }
    //TODO: 4. actualizamos los datos de la tabata usando "tabataid".
    await tabataModel.update(tabataData);

    //TODO:  5. si el campo de "privacy" es privado, borrar en registros de la tabla @favoriteWorkout donde el "tabataId" sea la actualizada
    if (tabataData.privacy === true) {
      //TODO: implementar favoriteWorkoutModel para realizar esta funcion.
      await favoriteWorkout.delete({ tabataId: tabataId });
    }

    //TODO: 6. devolvemos la tabata recien actualizada.
    const data = await tabataModel.findOne({ tabataId: tabataId });

    return data;
  } catch (err) {}
};

const removeTabata = async (userId, tabataId) => {
  "use strict";
  try {
    //[x]: 1. obtener el id del usuario por su token.

    //[x]: 2. verificar que exista el usuario.
    const checkUserExist = await userModel.findOne({ userId: userId });
    if (!checkUserExist) {
      throw Error("User Doesn't Exist");
    }
    //TODO: 3. verificar que exista la tabata.
    const checkTabataExist = await tabataModel.findOne({ tabataId: tabataId });
    if (!checkTabataExist) {
      throw Error("Tabata Doesn't Exist");
    }
    //TODO: 4. eliminamos la tabata.
    await tabataModel.erase();
    //? Se podra enviar algun dato ademas del codigo de respuesta al frontend?
  } catch (err) {}
};

module.exports = { newTabata, myTabatas, editTabata, removeTabata };
