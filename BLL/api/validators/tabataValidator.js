const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

const tabataValidator = [
  check("tittle")
    .exists()
    .notEmpty()
    .withMessage("missing tittle")
    .isLength({ max: 24 }),
  check("privacy")
    .exists()
    .notEmpty()
    .withMessage("missing privacy")
    .isBoolean()
    .withMessage("must be a boolean type"),
  check("description")
    .exists()
    .notEmpty()
    .withMessage("missing description")
    .isLength({ max: 120 }),
  check("effortTime")
    .exists()
    .notEmpty()
    .withMessage("missing effortTime")
    .isNumeric()
    .isLength({ max: 3 }),
  check("rounds")
    .exists()
    .notEmpty()
    .withMessage("missing rounds")
    .isNumeric()
    .isLength({ max: 2 }),
  check("restTime")
    .exists()
    .notEmpty()
    .withMessage("missing restTime")
    .isNumeric()
    .isLength({ max: 3 }),
  check("exercises.exercises").exists().isArray(),
  check("exercises.exercises").custom((exercises) => {
    // > verificar que el objeto JSON en el value de exercises sean de tipo @string
    for (let index = 0; index < exercises.length; index++) {
      if (typeof exercises[index] !== "string") {
        throw new Error("Solo deben ser strings");
      }
    }
    return true;
  }),
  handleResults,
];

const tabataIdValidator = [
  param("tabataid")
    .exists()
    .withMessage("Should include tabataId in the URI")
    .notEmpty(),
  handleResults,
];

module.exports = { tabataValidator, tabataIdValidator };
