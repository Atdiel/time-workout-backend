const { matchedData } = require("express-validator");
const challengeService = require("../../businessServices/challengeService");

const createChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const challengeData = matchedData(req);
    const data = await challengeService.newChallenge(userId, challengeData);
    res.send({ data });
  } catch (err) {}
};

const readChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await challengeService.myChallenges(userId);
    res.send({ data });
  } catch (err) {}
};

const updateChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const challengeId = matchedData(req).challengeid;
    const challengeData = matchedData(req);

    const data = await challengeService.editChallenge(
      userId,
      challengeId,
      challengeData
    );
    res.send({ data });
  } catch (err) {}
};

const deleteChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const challengeId = matchedData(req).challengeid;

    await challengeService.removeChallenge(userId, challengeId);
    res.send();
  } catch (err) {}
};

module.exports = {
  createChallenge,
  readChallenge,
  updateChallenge,
  deleteChallenge,
};
