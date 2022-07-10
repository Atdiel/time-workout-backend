const { matchedData } = require("express-validator");
const tabataService = require("../../businessServices/tabataService");
const { handleHttpError } = require("../handlers/handleError");

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

    await tabataService.newTabata(userId, tabataData);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
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
  } catch (err) {
    handleHttpError(res, err);
  }
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

    await tabataService.editTabata(userId, tabataId, tabataData);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
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
  } catch (err) {
    handleHttpError(res, err);
  }
};

module.exports = { createTabata, readTabata, updateTabata, deleteTabata };
