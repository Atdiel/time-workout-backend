const { check } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

/**
 * > Validate sign up form.
 */
const registerValidator = [
  check("name")
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
    .withMessage("name shouldn't be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("min name length is 3")
    .bail()
    .isLength({ max: 24 })
    .withMessage("max name length is 24"),

  check("lastName")
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
    .withMessage("lastName shouldn't be empty")
    .bail()
    .isLength({ min: 6 })
    .withMessage("min lastName length is 6")
    .bail()
    .isLength({ max: 24 })
    .withMessage("max lastName length is 24"),

  check("password")
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
    .withMessage("password shouldn't be empty")
    .bail()
    .isLength({ min: 8 })
    .withMessage("min password length is 8")
    .bail()
    .isLength({ max: 30 })
    .withMessage("max password length is 30"),

  check("email")
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
    .withMessage("email shouldn't be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .isLength({ min: 10 })
    .withMessage("min email length is 10")
    .bail()
    .isLength({ max: 48 })
    .withMessage("max email length is 48"),

  check("gender")
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
    .withMessage("gender shouldn't be empty")
    .bail()
    .isLength({ max: 1 })
    .withMessage("Only 'f' or 'm'"),

  check("birthday")
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
    .withMessage("birthday shouldn't be empty")
    .bail()
    .isDate({ format: "yyyy-mm-dd" })
    .withMessage("birthday format should be yyyy-mm-dd or yyyy/mm/dd"),

  //FIXME: validate a url verified.
  check("profilePicture")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    ),

  check("nationality")
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
    .withMessage("nationality shouldn't be empty")
    .bail()
    .isLength({ max: 2 })
    .withMessage("Use only 2 char for nationality"),

  handleResults,
];

/**
 * > Validate sign in form.
 */
const loginValidator = [
  check("email")
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
    .withMessage("email shouldn't be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .isLength({ min: 10 })
    .withMessage("min email length is 10")
    .bail()
    .isLength({ max: 48 })
    .withMessage("max email length is 48"),

  check("password")
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
    .withMessage("password shouldn't be empty")
    .bail()
    .isLength({ min: 8 })
    .withMessage("min password length is 8")
    .bail()
    .isLength({ max: 30 })
    .withMessage("max password length is 30"),

  handleResults,
];

module.exports = { registerValidator, loginValidator };
