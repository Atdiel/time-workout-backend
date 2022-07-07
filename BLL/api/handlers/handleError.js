const loggerWebhook = require("../tools/loggerWebhook");

/**
 * > manage the error responses to the client.
 * @param {JSON} res Object response provided for the server.
 * @param {Array} err Error Object.
 */
const handleHttpError = (res, err) => {
  if (err[0]) {
    res.status(500).send({ success: false, mssg: "Internal Server Error" });

    handleLogger(err[0]);
  } else {
    res.status(err[2]).send({ success: false, mssg: err[1] });
  }
};

const handleLogger = (message) => {
  //? The util.inspect() is used to convert the Error Object to String, otherwise
  //? logger does not work.
  loggerWebhook.write(require("util").inspect(message));
};

module.exports = { handleHttpError };
