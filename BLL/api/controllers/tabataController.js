const { matchedData } = require("express-validator");
const tabataService = require("../../businessServices/tabataService");

/**
 * ? crear una tabata para un usuario
 * @param {*} req
 * @param {*} res
 */
const createTabata = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const tabataData = matchedData(req);
    //FIXME no debe retornar nada
    const data = await tabataService.newTabata(userId, tabataData);
    res.send({ success: true });
  } catch (err) {}
};

/**
 * ? enviar al usuario todas sus tabatas
 * @param {*} req
 * @param {*} res
 */
const readTabata = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await tabataService.myTabatas(userId);
    res.send({ success: true, data });
  } catch (err) {}
};

/**
 * ? editar los datos de una tabata para un usuario
 * @param {*} req
 * @param {*} res
 */
const updateTabata = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const tabataId = matchedData(req).tabataid;
    const tabataData = matchedData(req);
    //FIXME el servicio no debe retornar ningun valor
    const data = await tabataService.editTabata(userId, tabataId, tabataData);
    res.send({ success: true });
  } catch (err) {}
};

/**
 * ? eliminar una tabata para un usuario
 * @param {*} req
 * @param {*} res
 */
const deleteTabata = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const tabataId = matchedData(req).tabataid;
    await tabataService.removeTabata(userId, tabataId);
    res.send({ success: true });
  } catch (err) {}
};

module.exports = { createTabata, readTabata, updateTabata, deleteTabata };
