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
    .notEmpty()
    .withMessage("tittle shouldn't be empty")
    .bail()
    .isLength({ max: 30 })
    .withMessage("tittle too large"),

  check("description")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("description shouldn't be empty")
    .bail()
    .isLength({ max: 120 })
    .withMessage("description too large. Max length 120"),

  check("recordTable")
    .isObject()
    .withMessage("recordTable should be an JSON object"),

  check("recordTable.records.*.timestamp")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((_, { req }) => {
      let obj = req.body.recordTable.records;
      if (obj.constructor.name == "Array") {
        return true;
      }
      throw new Error("records should be an array");
    })
    .bail()
    .isISO8601()
    .withMessage("timestamp invalid date"),

  check("recordTable.records.*.amount")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isInt()
    .withMessage("amount should been a number, try without quotes")
    .bail()
    .not()
    .isIn([0])
    .withMessage("amount shouldn't be a zero value"),

  handleResults,
];

/**
 * > Validate record ID in the URI.
 */
const recordIdValidator = [
  param("recordid")
    .exists()
    .withMessage("Should include recordid in the URI")
    .notEmpty(),

  handleResults,
];

module.exports = { recordValidator, recordIdValidator };
