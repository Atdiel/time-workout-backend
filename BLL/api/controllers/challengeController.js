const { matchedData } = require("express-validator");
const challengeService = require("../../businessServices/challengeService");
const { handleHttpError } = require("../handlers/handleError");

/**
 * ? crear un nuevo challenge al usuario
 * @param {*} req
 * @param {*} res
 */
const createChallenge = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;

    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const challengeData = matchedData(req);

    //* usamos el servicio para registrar un nuevo Challenge
    await challengeService.newChallenge(userId, challengeData);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
};

/**
 * ? mandar al usuario sus challenges
 * @param {*} req
 * @param {*} res
 */
const readChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await challengeService.myChallenges(userId);
    res.send({ success: true, data });
  } catch (err) {
    handleHttpError(res, err);
  }
};

/**
 * ? modificar datos de una challenge para un usuario
 * @param {*} req
 * @param {*} res
 */
const updateChallenge = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;

    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const challengeId = matchedData(req).challengeid;
    const challengeData = matchedData(req);

    await challengeService.editChallenge(userId, challengeId, challengeData);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
};

/**
 * ? eliminar un challenge para un usuario
 * @param {*} req
 * @param {*} res
 */
const deleteChallenge = async (req, res) => {
  try {
    //* primero guardamos el id antes matchear la request
    const userId = req.user.id;
    //* Limpiamos la request dejando solo campos autorizados por validator-middleware
    const challengeId = matchedData(req).challengeid;

    await challengeService.removeChallenge(userId, challengeId);

    res.send({ success: true });
  } catch (err) {
    handleHttpError(res, err);
  }
};

module.exports = {
  createChallenge,
  readChallenge,
  updateChallenge,
  deleteChallenge,
};
