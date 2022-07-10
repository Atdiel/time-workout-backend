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
    .notEmpty()
    .withMessage("name shouldn't be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("name too short")
    .bail()
    .isLength({ max: 24 })
    .withMessage("name too large"),

  check("lastName")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("lastName shouldn't be empty")
    .bail()
    .isLength({ min: 6 })
    .withMessage("lastName too short")
    .bail()
    .isLength({ max: 24 })
    .withMessage("lastName too large"),

  check("password")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("password shouldn't be empty")
    .isLength({ min: 8 })
    .withMessage("password too short")
    .bail()
    .isLength({ max: 30 })
    .withMessage("password too large"),

  check("email")
    .exists()
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
    .withMessage("email too short")
    .bail()
    .isLength({ max: 48 })
    .withMessage("email too large"),

  check("gender")
    .exists()
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
    ),

  check("nationality")
    .exists()
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
    .notEmpty()
    .withMessage("email shouldn't be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .isLength({ min: 10 })
    .withMessage("email too short")
    .bail()
    .isLength({ max: 48 })
    .withMessage("email too large"),

  check("password")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("password shouldn't be empty")
    .isLength({ min: 8 })
    .withMessage("password too short")
    .bail()
    .isLength({ max: 30 })
    .withMessage("password too large"),

  handleResults,
];

module.exports = { registerValidator, loginValidator };
