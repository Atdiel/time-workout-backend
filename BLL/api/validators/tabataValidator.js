const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

/**
 * > Validate tabata form.
 */
const tabataValidator = [
  check("tittle")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("title shouldn't be empty")
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

  check("effortTime")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("effortTime shouldn't be empty")
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Number") {
        if (value <= 900) return true;
        throw new Error("max effortTime value is 900");
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  check("rounds")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("rounds shouldn't be empty")
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Number") {
        if (value <= 99) return true;
        throw new Error("max rounds value is 99");
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  check("restTime")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .notEmpty()
    .withMessage("restTime shouldn't be empty")
    .bail()
    .custom((value) => {
      if (value.constructor.name === "Number") {
        if (value <= 900) return true;
        throw new Error("max restTime value is 900");
      }
      throw new Error(
        "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
      );
    }),

  check("exercises.exercises")
    .exists()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .isArray()
    .withMessage(
      "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
    )
    .bail()
    .custom((exercises) => {
      for (let index = 0; index < exercises.length; index++) {
        if (exercises[index].constructor.name !== "String") {
          throw new Error(
            "Verify the API docs in https://time-workout.herokuapp.com/docs/v1/"
          );
        }
      }
      return true;
    }),

  handleResults,
];

const tabataIdValidator = [
  param("tabataid").isNumeric().withMessage("Invalid tabata ID in the URI"),

  handleResults,
];

module.exports = { tabataValidator, tabataIdValidator };
