const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

const routineValidator = [
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
  check("exercisesInfo.routines.*.exerciseName")
    .exists()
    .isAlphanumeric()
    .custom((value, { req }) => {
      let obj = req.body.exercisesInfo.routines;
      if (obj.constructor.name == "Array") {
        return true;
      }
      throw new Error("should been within an array");
    }),
  check("exercisesInfo.routines.*.effortTime").exists().isInt(),
  check("exercisesInfo.routines.*.restTime").exists().isInt(),
  handleResults,
];

const routineIdValidator = [
  param("routineid")
    .exists()
    .withMessage("Should include routineid in the URI")
    .notEmpty(),
  handleResults,
];

module.exports = { routineValidator, routineIdValidator };
