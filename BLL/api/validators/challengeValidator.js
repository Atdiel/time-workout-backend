const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

/**
 * > Validate challenge form.
 */
const challengeValidator = [
  check("tittle")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("title shouldn't be empty")
    .bail()
    .isLength({ max: 24 })
    .withMessage("max title length is 24"),

  check("description")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("description shouldn't be empty")
    .bail()
    .isLength({ max: 120 })
    .withMessage("max description length is 120"),

  check("startDate")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isISO8601()
    .withMessage("startDate invalid date"),

  check("endDate")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isISO8601()
    .withMessage("endDate invalid date")
    .bail()
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("endDate must be equal or later than startDate");
      }
      return true;
    }),

  check("days")
    .isObject()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    ),

  check("days.days")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isArray({ max: 7 })
    .withMessage("Week have only 7 days")
    .bail()
    .custom((values) => {
      for (let index = 0; index < values.length; index++) {
        if (typeof values[index] !== "string") {
          throw new Error("Strings instead int, try with quotes");
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
          throw new Error(`${values[index]} isn't a valid day`);
        }
      }
      for (let a = 0; a < values.length - 1; a++) {
        for (let b = a + 1; b < values.length; b++) {
          if (values[a] === values[b]) {
            throw new Error(`You repeated ${values[a]} in the array`);
          }
        }
      }
      return true;
    }),

  handleResults,
];

/**
 * > Validate challenge ID in the URI
 */
const challengeIdValidator = [
  param("challengeid")
    .isNumeric()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    ),

  handleResults,
];

module.exports = { challengeValidator, challengeIdValidator };
