const express = require("express");
const router = express.Router();

//* CONTROLLERS ⚡⚡
const {
  createRoutine,
  readRoutine,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routineController");

//* MIDDLEWARE 🔍🔍
const { authMiddleware } = require("../middlewares/tokenMiddleware");

//* VALIDATORS ✅✅
const {
  routineValidator,
  routineIdValidator,
} = require("../validators/routineValidator");

//* ROUTES ✈️✈️
//> http://localhost:{PORT}/api/v1/routine/{subroute}

/**
 * > GET >> subroute = /
 * @openapi
 * /routine:
 *  get:
 *    tags:
 *    - "routine"
 *    summary: "Return own routine for user"
 *    description: "Return a list of user's routines giving a token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      "200":
 *        description: "OK"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/routines"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.get("/", authMiddleware, readRoutine);

/**
 * > POST >> subroute = /
 * @openapi
 * /routine:
 *  post:
 *    tags:
 *    - "routine"
 *    summary: "Create a new routine"
 *    description: "Create a new routine using token to authenticate"
 *    security:
 *    - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/routine"
 *    responses:
 *      "200":
 *        description: "Routine created successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/routineWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.post("/", authMiddleware, routineValidator, createRoutine);

/**
 * > PUT >> subroute = /{routineid:String}
 * @openapi
 * /routine/{routineid}:
 *  put:
 *    tags:
 *    - "routine"
 *    summary: "Update routine"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: routineid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "The routine ID"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/routine"
 *    responses:
 *      "200":
 *        description: "Your routine has been updated successfully"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/routineWithId"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.put(
  "/:routineid",
  authMiddleware,
  routineIdValidator,
  routineValidator,
  updateRoutine
);

/**
 * > DELETE >> subroute = /{routineid:String}
 * @openapi
 * /routine/{routineid}:
 *  delete:
 *    tags:
 *    - "routine"
 *    summary: "Delete a routine"
 *    description: "For valid response try integer IDs with positive integer value"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: routineid
 *      required: true
 *      schema:
 *        type: integer
 *        minimum: 1
 *      description: "The routine ID"
 *    responses:
 *      "200":
 *        description: "Routine deleted successfully"
 *      "403":
 *        $ref: "#/components/responses/unauthorizedError"
 */
router.delete("/:routineid", authMiddleware, routineIdValidator, deleteRoutine);

module.exports = router;
