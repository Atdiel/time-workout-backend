const express = require("express");
const router = express.Router();

// > CONTROLLERS
const {
  createRoutine,
  readRoutine,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routineController");

// > MIDDLEWARES
const { authMiddleware } = require("../middlewares/tokenMiddleware");

// > VALIDATORS
const {
  routineValidator,
  routineIdValidator,
} = require("../validators/routineValidator");

//[x]: implementar validators
/**
 * > Consultar Rutinas de un usuario.
 */
router.get("/", authMiddleware, readRoutine); //[x]: implementar controller get

/**
 * > Agregar una Rutina para un usuario.
 */
router.post("/", authMiddleware, routineValidator, createRoutine); //[x]: implementar controller post

/**
 * > Editar una Rutina de un usuario.
 */
router.put(
  "/:routineid",
  authMiddleware,
  routineIdValidator,
  routineValidator,
  updateRoutine
); //[x]: implementar controller put

/**
 * > Eliminar una Rutina de un usuario.
 */
router.delete("/:routineid", authMiddleware, routineIdValidator, deleteRoutine); //[x]: implementar controller delete

module.exports = router;
