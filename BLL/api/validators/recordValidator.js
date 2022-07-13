const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

/**
 * > Validate record form.
 */
const recordValidator = [
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
    .isLength({ max: 30 })
    .withMessage("max title length is 30"),

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

  check("recordTable")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Object") {
        if (value.records) {
          if (
            value.records.constructor.name === "Array" &&
            value.records.length > 0
          )
            return true;
        }
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  check("recordTable.records.*.timestamp")
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
    .withMessage("timestamp invalid date"),

  check("recordTable.records.*.amount")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Number") {
        /**
         * * 0 < amount < 1001
         *  */
        if (value <= 0) throw new Error("amount shouldn't be equal to 0");
        if (value > 1000) throw new Error("max amount value is 1000");

        if (value % 2 === 0 || value % 2 === 1) return true;
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  handleResults,
];

/**
 * > Validate record ID in the URI.
 */
const recordIdValidator = [
  param("recordid").isNumeric().withMessage("Invalid record ID in the URI"),

  handleResults,
];

module.exports = { recordValidator, recordIdValidator };
