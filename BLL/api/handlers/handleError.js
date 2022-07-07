const loggerWebhook = require("../tools/loggerWebhook");

/**
 * > manage the error responses to the client.
 * @param {JSON} res Object response provided for the server.
 * @param {Array} err Error Object.
 */
const handleHttpError = (res, err) => {
  if (err[0]) {
    res.status(err[2]);
    res.send({ success: false, mssg: err[0] });

    handleLogger(err[2]);
  } else {
    res.status(500).send({ success: false, mssg: "Something was wrong" });

    handleLogger(err);
  }
};

const handleLogger = (message) => {
  loggerWebhook.write(message);
};

module.exports = { handleHttpError };
