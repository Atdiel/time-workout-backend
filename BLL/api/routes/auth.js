const express = require("express");
const router = express.Router();

//* CONTROLLERS ⚡⚡
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/authController");

//* MIDDLEWARE 🔍🔍
const { authMiddleware } = require("../middlewares/tokenMiddleware");

//* VALIDATORS ✅✅
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

//* ROUTES ✈️✈️
//> http://localhost:{PORT}/api/v1/auth/{subroute}

/**
 * > POST >> subroute = /register
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *    - "user"
 *    summary: "Register a new user"
 *    description: "Create a new user to use the API"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          description: "User object with their contact info"
 *          schema:
 *            $ref: "#/components/schemas/user"
 *    responses:
 *      "201":
 *        description: "user registered successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/userWithToken"
 *      "403":
 *        description: "invalid input"
 */
router.post("/register", registerValidator, registerUser);

/**
 * > POST >> subroute = /login
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *    - "user"
 *    summary: "Login user"
 *    description: "Login a user already registered"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          description: "User object with email and password field"
 *          schema:
 *            type: "object"
 *            properties:
 *              email:
 *                type: "string"
 *              password:
 *                type: "string"
 *    responses:
 *      "200":
 *        description: "Valid user"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/userWithToken"
 */
router.post("/login", loginValidator, loginUser);

/**
 * > PUT >> subroute = /edit
 * @openapi
 * /auth/edit:
 *  put:
 *    tags:
 *    - "user"
 *    summary: "Edit User contact"
 *    description: "Update user's contact"
 *    security:
 *    - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/user"
 *    responses:
 *      "200":
 *        description: "OK"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/userWithId"
 */
router.put("/edit", registerValidator, authMiddleware, updateUser);

module.exports = router;
