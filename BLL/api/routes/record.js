const express = require("express");
const router = express.Router();

//> CONTROLLERS
const {
  createRecord,
  readRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

//> MIDDLEWARE
const { authMiddleware } = require("../middlewares/tokenMiddleware");

//> VALIDATORS
const {
  recordIdValidator,
  recordValidator,
} = require("../validators/recordValidator");

//> ROUTES

/**
 * > Consultar Records de un usuario.
 */
router.get("/", authMiddleware, readRecord);

/**
 * > Agregar un Record para un usuario.
 */
router.post("/", authMiddleware, recordValidator, createRecord);

/**
 * > Editar un Record de un usuario.
 */
router.put(
  "/:recordid",
  authMiddleware,
  recordIdValidator,
  recordValidator,
  updateRecord
);

/**
 * > Eliminar un Record de un usuario.
 */
router.delete("/:recordid", authMiddleware, recordIdValidator, deleteRecord);

module.exports = router;
