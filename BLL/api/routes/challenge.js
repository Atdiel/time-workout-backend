const express = require("express");
const router = express.Router();

//> CONTROLLERS
const {
  createChallenge,
  readChallenge,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");
//> MIDDLEWARE
const { authMiddleware } = require("../middlewares/tokenMiddleware");
//> VALIDATORS
const {
  challengeValidator,
  challengeIdValidator,
} = require("../validators/challengeValidator");

/**
 * > Consultar Challenges de un usuario.
 */
router.get("/", authMiddleware, readChallenge);

/**
 * > Agregar un Challenge para un usuario.
 */
router.post("/", authMiddleware, challengeValidator, createChallenge);

/**
 * > Editar un Challenge de un usuario.
 */
router.put(
  "/:challengeid",
  authMiddleware,
  challengeIdValidator,
  challengeValidator,
  updateChallenge
);

/**
 * > Eliminar un Challenge de un usuario.
 */
router.delete(
  "/:challengeid",
  authMiddleware,
  challengeIdValidator,
  deleteChallenge
);

module.exports = router;
