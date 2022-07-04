const { matchedData } = require("express-validator");
const routineService = require("../../businessServices/routineService");

/**
 * ? crear una nueva routine para un usuario
 * @param {*} req
 * @param {*} res
 */
const createRoutine = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;

    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const routineData = matchedData(req);

    await routineService.newRoutine(userId, routineData);

    res.send({ success: true });
  } catch (err) {
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

/**
 * ? enviamos al usuario todas sus routines
 * @param {*} req
 * @param {*} res
 */
const readRoutine = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await routineService.myRoutines(userId);

    res.send({ success: true, data });
  } catch (err) {
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

/**
 * ? modificar una rutina para un usuario
 * @param {*} req
 * @param {*} res
 */
const updateRoutine = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;

    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const routineId = matchedData(req).routineid;
    const routineData = matchedData(req);

    await routineService.editRoutine(userId, routineId, routineData);

    res.send({ success: true });
  } catch (err) {
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

/**
 * ? eliminar una routine para un usuario
 * @param {*} req
 * @param {*} res
 */
const deleteRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const routineId = matchedData(req).routineid;

    await routineService.removeRoutine(userId, routineId);
    res.send({ success: true });
  } catch (err) {}
};

module.exports = { createRoutine, readRoutine, updateRoutine, deleteRoutine };
