const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

/**
 * > Validate routine form.
 */
const routineValidator = [
  check("tittle")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("tittle shouldn't be empty")
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isLength({ max: 24 })
    .withMessage("max title length is 24"),

  check("privacy")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("privacy shouldn't be empty")
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Boolean") return true;
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  check("description")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("description shouldn't be empty")
    .bail()
    .isString()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isLength({ max: 120 })
    .withMessage("max description length is 120"),

  check("exercisesInfo.routines").custom((value) => {
    if (value.constructor.name === "Array") return true;
    throw new Error(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    );
  }),

  check("exercisesInfo.routines.*.exerciseName")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((value) => {
      if (value.constructor.name === "String") return true;
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    })
    .bail()
    .isLength({ max: 35 })
    .withMessage("max exerciseName length is 35"),

  check("exercisesInfo.routines.*.effortTime")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Number") {
        if (value <= 3600) return true;
        throw new Error("max effortTime value is 3600");
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  check("exercisesInfo.routines.*.restTime")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Number") {
        if (value <= 1200) return true;
        throw new Error("max restTime value is 1200");
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  handleResults,
];

/**
 * > Validate routine ID in the URI.
 */
const routineIdValidator = [
  param("routineid").isNumeric().withMessage("Invalid routine ID in the URI"),

  handleResults,
];

module.exports = { routineValidator, routineIdValidator };
