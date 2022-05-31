const { matchedData } = require("express-validator");
const recordService = require("../../businessServices/recordService");

const createRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const recordData = matchedData(req);
    const data = await recordService.newRecord(userId, recordData);
    res.send({ data });
  } catch (err) {}
};

const readRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await recordService.myRecords(userId);
    res.send({ data });
  } catch (err) {}
};

const updateRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const recordId = matchedData(req).recordid;
    const recordData = matchedData(req);
    const data = await recordService.editRecord(userId, recordId, recordData);
    res.send({ data });
  } catch (err) {}
};

const deleteRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const recordId = matchedData(req).recordid;
    await recordService.removeRecord(userId, recordId);
    res.send();
  } catch (err) {}
};

module.exports = { createRecord, readRecord, updateRecord, deleteRecord };
