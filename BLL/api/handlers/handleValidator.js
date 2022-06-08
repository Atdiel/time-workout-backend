const { validationResult } = require("express-validator");

const handleResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    const data = {
      success: false,
      errors: err.array(),
    };
    res.status(403).send(data);
  }
};

module.exports = handleResults;
