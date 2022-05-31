const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

const challengeValidator = [
  check("tittle")
    .exists()
    .notEmpty()
    .withMessage("missing tittle")
    .isString()
    .isLength({ max: 24 })
    .withMessage("Length max 24"),
  check("description")
    .exists()
    .notEmpty()
    .withMessage("missing description")
    .isString()
    .isLength({ max: 120 })
    .withMessage("Length max 120"),
  check("startDate")
    .exists()
    .notEmpty()
    .withMessage("missing startDate")
    .isISO8601(),
  check("endDate")
    .exists()
    .notEmpty()
    .withMessage("missing startDate")
    .isISO8601()
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date must be valid and after start date");
      }
      return true;
    }),
  check("days")
    .not()
    .isArray()
    .withMessage("days must be an object instead array"),
  check("days.days")
    .exists()
    .withMessage("missing property: days within key: days")
    .bail()
    .isArray({ max: 7 })
    .withMessage("Week have only 7 days")
    .bail()
    .custom((values) => {
      for (let index = 0; index < values.length; index++) {
        if (typeof values[index] !== "string") {
          throw new Error("Solo deben ser strings");
        }
        if (
          values[index] === "l" ||
          values[index] === "m" ||
          values[index] === "x" ||
          values[index] === "j" ||
          values[index] === "v" ||
          values[index] === "s" ||
          values[index] === "d"
        ) {
          continue;
        } else {
          throw new Error("Dias invalidos");
        }
      }
      console.log("pase por aqui");
      for (let a = 0; a < values.length - 1; a++) {
        for (let b = a + 1; b < values.length; b++) {
          if (values[a] === values[b]) {
            throw new Error("Los dias no deben ser iguales");
          }
        }
      }
      return true;
    }),
  handleResults,
];

const challengeIdValidator = [
  param("challengeid")
    .exists()
    .withMessage("Should include challengeid in the URI")
    .notEmpty(),
  handleResults,
];

module.exports = { challengeValidator, challengeIdValidator };
