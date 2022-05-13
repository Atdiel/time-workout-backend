const express = require("express");
const router = express.Router();
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/tokenMiddleware");

/**
 * Registrar a un usuario nuevo
 */
router.post("/register", registerValidator, registerUser);

/**
 * Validar credencianles de  usuario
 */
router.post("/login", loginValidator, loginUser);

/**
 * Editar a un usuario usando middleware para validar usuario
 */
router.put("/edit", registerValidator, authMiddleware, updateUser);

module.exports = router;
