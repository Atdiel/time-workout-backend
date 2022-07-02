const { matchedData } = require("express-validator");
const challengeService = require("../../businessServices/challengeService");

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
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
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
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
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
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
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
    res.status(400);
    res.send({ success: false, mssg: err[0] });
    if (err[1]) console.log(err[1]);
  }
};

module.exports = {
  createChallenge,
  readChallenge,
  updateChallenge,
  deleteChallenge,
};
