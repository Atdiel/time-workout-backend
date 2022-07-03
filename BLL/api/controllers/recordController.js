const { matchedData } = require("express-validator");
const recordService = require("../../businessServices/recordService");

/**
 * ? crear un record para un usuario
 * @param {*} req
 * @param {*} res
 */
const createRecord = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;

    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const recordData = matchedData(req);

    await recordService.newRecord(userId, recordData);

    res.send({ success: true });
  } catch (err) {
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

/**
 * ? mandar al usuario sus records
 * @param {*} req
 * @param {*} res
 */
const readRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await recordService.myRecords(userId);

    res.send({ success: true, data });
  } catch (err) {
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

/**
 * ? modificar datos de un record para un usuario
 * @param {*} req
 * @param {*} res
 */
const updateRecord = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;

    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const recordId = matchedData(req).recordid;
    const recordData = matchedData(req);

    await recordService.editRecord(userId, recordId, recordData);

    res.send({ success: true });
  } catch (err) {
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

/**
 * ? eliminar un record para un usuario
 * @param {*} req
 * @param {*} res
 */
const deleteRecord = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const recordId = matchedData(req).recordid;
    await recordService.removeRecord(userId, recordId);
    res.send({ success: true });
  } catch (err) {}
};

module.exports = { createRecord, readRecord, updateRecord, deleteRecord };
