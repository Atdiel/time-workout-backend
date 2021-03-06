const express = require("express");
const router = express.Router();

//* CONTROLLERS โกโก
const {
  createTabata,
  readTabata,
  updateTabata,
  deleteTabata,
} = require("../controllers/tabataController");

//* MIDDLEWARE ๐๐
const { authMiddleware } = require("../middlewares/tokenMiddleware");

//* VALIDATORS โโ
const {
  tabataValidator,
  tabataIdValidator,
} = require("../validators/tabataValidator");

//* ROUTES โ๏ธโ๏ธ
//> http://localhost:{PORT}/api/v1/tabata/{subroute}

/**
 * > Consultar Tabatas de un usuario.
 * @openapi
 * /tabata:
 *  get:
 *    tags:
 *    - "tabata"
 *    summary: "Return own tabata for user"
 *    description: "Return a list of user's tabatas giving a token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      "200":
 *        description: "OK"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/tabatas"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.get("/", authMiddleware, readTabata); //[x]:๐ง agregar controlador readTabata.

/**
 *  > Agregar una Tabata para un usuario.
 * @openapi
 * /tabata:
 *  post:
 *    tags:
 *    - "tabata"
 *    summary: "Create a new tabata"
 *    description: "Create a new tabata using token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/tabata"
 *    responses:
 *      "200":
 *        description: "Tabata created successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/tabataWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.post("/", tabataValidator, authMiddleware, createTabata); //[x]:๐ง agregar controlador createTabata.

/**
 * > Editar una Tabata de un usuario.
 * @openapi
 * /tabata/{tabataid}:
 *  put:
 *    tags:
 *    - "tabata"
 *    summary: "Update tabata"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: tabataid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "The tabata ID"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/tabata"
 *    responses:
 *      "200":
 *        description: "Your tabata has been updated successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/tabataWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.put(
  "/:tabataid",
  tabataIdValidator,
  tabataValidator,
  authMiddleware,
  updateTabata
); //[x]:๐ง agregar controlador updateTabata.

/**
 * > Eliminar una Tabata de un usuario.
 * @openapi
 * /tabata/{tabataid}:
 *  delete:
 *    tags:
 *    - "tabata"
 *    summary: "Delete a tabata"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: tabataid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "The tabata ID"
 *    responses:
 *      "200":
 *        description: "Tabata deleted successfully"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.delete("/:tabataid", tabataIdValidator, authMiddleware, deleteTabata); //[x]:๐ง agregar controlador deleteTabata.

module.exports = router;
