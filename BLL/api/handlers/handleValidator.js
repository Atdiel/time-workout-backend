const { validationResult } = require("express-validator");

/**
 * > Handle if exists a few errors that arrive
 * > from the validators.
 * @param {*} req
 * @param {*} res
 * @param {Callback} next
 */
const handleResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(400).send({
      success: false,
      mssg: "Verify your form request body",
      errors: err.array(),
    });
  }
};

module.exports = handleResults;
