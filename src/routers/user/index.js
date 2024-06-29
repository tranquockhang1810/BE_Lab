const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

//Model
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
  *        - post
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         phone:
 *           type: string
 *           description: The phone of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         post:
 *           type: array
 *           description: The post of the user
 *       example:
 *         id: 123
 *         name: John Doe
 *         phone: 0123456789
 *         address: 123 Main Street
 *         email: "7g6yK@example.com"
 *         post: []
 */

// Create user
/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", userController.createUser);

// Get all users
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", userController.getAllUsers);

// Get user details
/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get user details
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/:id", userController.getUserById);

// Update user
/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update the user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/
router.put("/:id", userController.updateUser);

// Delete user
/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted successfully
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;