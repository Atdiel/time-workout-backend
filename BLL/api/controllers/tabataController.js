const { matchedData } = require("express-validator");
const tabataService = require("../../businessServices/tabataService");

const createTabata = async (req, res) => {
  try {
    const userId = req.user.id;
    const tabataData = matchedData(req);
    //TODO: Creamos servicio para crear una tabata.
    const data = await tabataService.newTabata(userId, tabataData);
    res.send({ data });
  } catch (err) {}
};

const readTabata = async (req, res) => {
  try {
    const userId = req.user.id;
    //TODO: Creamos servicio para consultar tabatas de usuario.
    const data = await tabataService.myTabatas(userId);
    res.send({ data });
  } catch (err) {}
};

const updateTabata = async (req, res) => {
  try {
    const userId = req.user.id;
    const tabataId = matchedData(req).tabataid;
    const tabataData = matchedData(req);
    //TODO: Creamos servicio para editar tabata de usuario.
    const data = await tabataService.editTabata(userId, tabataId, tabataData);
    res.send({ data });
  } catch (err) {}
};

const deleteTabata = async (req, res) => {
  try {
    const userId = req.user.id;
    const tabataId = matchedData(req).tabataid;
    //TODO: Creamos servicio para eliminar una tabata de usuario.
    await tabataService.removeTabata(userId, tabataId);
    res.send();
  } catch (err) {}
};

module.exports = { createTabata, readTabata, updateTabata, deleteTabata };
