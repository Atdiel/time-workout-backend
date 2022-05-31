const { matchedData } = require("express-validator");
const routineService = require("../../businessServices/routineService");

const createRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    const routineData = matchedData(req);
    const data = await routineService.newRoutine(userId, routineData);
    res.send({ data });
  } catch (err) {}
};

const readRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await routineService.myRoutines(userId);
    res.send({ data });
  } catch (err) {}
};

const updateRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    const routineId = matchedData(req).routineid;
    const routineData = matchedData(req);

    const data = await routineService.editRoutine(
      userId,
      routineId,
      routineData
    );
    res.send({ data });
  } catch (err) {}
};

const deleteRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    const routineId = matchedData(req).routineid;

    await routineService.removeRoutine(userId, routineId);
    res.send();
  } catch (err) {}
};

module.exports = { createRoutine, readRoutine, updateRoutine, deleteRoutine };
