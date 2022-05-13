const { check } = require("express-validator");
const handleResults = require("../handlers/handleValidator");

/**
 * validacion al registrar un usuario
 */
const registerValidator = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 24 }),
  check("lastName").exists().notEmpty().isLength({ min: 6, max: 24 }),
  check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),
  check("email").exists().notEmpty().isLength({ min: 10, max: 48 }).isEmail(),
  check("gender").exists().notEmpty().isLength({ min: 1, max: 1 }),
  check("birthday").exists().notEmpty().isDate({ format: "yyyy-mm-dd" }),
  check("profilePicture").exists().isURL(),
  check("nationality").exists().notEmpty().isLength({ min: 2, max: 2 }),
  handleResults,
];

/**
 * validacion al inicio de sesion de un usuario
 */
const loginValidator = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),
  handleResults,
];

module.exports = { registerValidator, loginValidator };
