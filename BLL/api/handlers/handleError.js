const loggerWebhook = require("../tools/loggerWebhook");

/**
 * > manage the error responses to the client.
 * @param {JSON} res Object response provided for the server.
 * @param {Array} err Error Object.
 */
const handleHttpError = (res, err) => {
  //TODO: create the handleLogger function.
  handleLogger();

  if (err[0]) {
    res.status(err[2]);
    res.send({ success: false, mssg: err[0] });
  } else {
    res.status(500).send({ success: false, mssg: "Something was wrong" });
  }
};

const handleLogger = () => {};

module.exports = { handleHttpError };
