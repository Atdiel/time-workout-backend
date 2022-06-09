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
 * @openapi
 * /record:
 *  get:
 *    tags:
 *    - "record"
 *    summary: "Return own record for user"
 *    description: "returns a list of user's records giving a token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      "200":
 *        description: "OK"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/records"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.get("/", authMiddleware, readRecord);

/**
 * > Agregar un Record para un usuario.
 * @openapi
 * /record:
 *  post:
 *    tags:
 *    - "record"
 *    summary: "Create a new record"
 *    description: "create a new record using token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/record"
 *    responses:
 *      "200":
 *        description: "Record created successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/recordWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.post("/", authMiddleware, recordValidator, createRecord);

/**
 * > Editar un Record de un usuario.
 * @openapi
 * /record/{recordid}:
 *  put:
 *    tags:
 *    - "record"
 *    summary: "Update a record"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: recordid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "The record ID"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          description: "Record object with parameters updated"
 *          schema:
 *            $ref: "#/components/schemas/record"
 *    responses:
 *      "200":
 *        description: "Your record has been updated successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/recordWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
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
 * @openapi
 * /record/{recordid}:
 *  delete:
 *    tags:
 *    - "record"
 *    summary: "Delete a record"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: recordid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "The record ID"
 *    responses:
 *      "200":
 *        description: "Record deleted successfully"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.delete("/:recordid", authMiddleware, recordIdValidator, deleteRecord);

module.exports = router;
