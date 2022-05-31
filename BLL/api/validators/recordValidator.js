const { check, param } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

const recordValidator = [
  check("tittle")
    .exists()
    .notEmpty()
    .withMessage("missing tittle")
    .isLength({ max: 30 }),
  check("description")
    .exists()
    .notEmpty()
    .withMessage("missing description")
    .isLength({ max: 120 }),
  check("recordTable.records.*.timestamp")
    .exists()
    .isISO8601()
    .custom((value, { req }) => {
      let obj = req.body.recordTable.records;
      if (obj.constructor.name == "Array") {
        return true;
      }
      throw new Error("should been within an array");
    }),
  check("recordTable.records.*.amount").exists().isInt(),
  handleResults,
];

const recordIdValidator = [
  param("recordid")
    .exists()
    .withMessage("Should include recordid in the URI")
    .notEmpty(),
  handleResults,
];

module.exports = { recordValidator, recordIdValidator };
