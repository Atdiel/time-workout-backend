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
 * @openapi
 * /challenge:
 *  get:
 *    tags:
 *    - "challenge"
 *    summary: "Return own challenge for user"
 *    description: "returns user challenges using token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      "200":
 *        description: "OK"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/challenges"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.get("/", authMiddleware, readChallenge);

/**
 * > Agregar un Challenge para un usuario.
 * @openapi
 * /challenge:
 *  post:
 *    tags:
 *    - "challenge"
 *    summary: "Create new challenge"
 *    description: "create a new challenge using token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          description: "challenge object with you personal parameters"
 *          schema:
 *            $ref: "#/components/schemas/challenge"
 *    responses:
 *      "200":
 *        description: "Challenge created successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/challengeWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.post("/", authMiddleware, challengeValidator, createChallenge);

/**
 * > Editar un Challenge de un usuario.
 * @openapi
 * /challenge/{challengeid}:
 *  put:
 *    tags:
 *    - "challenge"
 *    summary: "Update a challenge"
 *    description: "Edit a challenge using token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: challengeid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "the challenge ID"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          description: "challenge object with parameters updated"
 *          schema:
 *            $ref: "#/components/schemas/challenge"
 *    responses:
 *      "200":
 *        description: "Your challenge has been updated successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/challengeWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
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
 * @openapi
 * /challenge/{challengeid}:
 *  delete:
 *    tags:
 *    - "challenge"
 *    summary: "Delete a challenge"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: challengeid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "the challenge ID"
 *    responses:
 *      "200":
 *        description: "challenge deleted successfully"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.delete(
  "/:challengeid",
  authMiddleware,
  challengeIdValidator,
  deleteChallenge
);

module.exports = router;
