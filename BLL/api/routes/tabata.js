const express = require("express");
const router = express.Router();
// > CONTROLLER
const {
  createTabata,
  readTabata,
  updateTabata,
  deleteTabata,
} = require("../controllers/tabataController");
// > MIDDLEWARE
const { authMiddleware } = require("../middlewares/tokenMiddleware");
// > VALIDATOR
const {
  tabataValidator,
  tabataIdValidator,
} = require("../validators/tabataValidator");

//[x]: crear validator para tabata.
//[x]: crear validator por tabataId.

/**
 * > Consultar Tabatas de un usuario.
 */
router.get("/", authMiddleware, readTabata); //[x]:🧐 agregar controlador readTabata.

/**
 *  > Agregar una Tabata para un usuario.
 */
router.post("/", tabataValidator, authMiddleware, createTabata); //[x]:🧐 agregar controlador createTabata.

/**
 * > Editar una Tabata de un usuario.
 */
router.put(
  "/:tabataid",
  tabataIdValidator,
  tabataValidator,
  authMiddleware,
  updateTabata
); //[x]:🧐 agregar controlador updateTabata.

/**
 * > Eliminar una Tabata de un usuario.
 */
router.delete("/:tabataid", tabataIdValidator, authMiddleware, deleteTabata); //[x]:🧐 agregar controlador deleteTabata.

module.exports = router;
