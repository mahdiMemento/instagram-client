const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with email, username, and password. Validates the request and checks for existing users with the same email or username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - userName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               userName:
 *                 type: string
 *                 description: The username desired by the user.
 *               password:
 *                 type: string
 *                 description: The password for the account.
 *     responses:
 *       200:
 *         description: The user successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the user is successfully registered.
 *                 data:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                       description: The registered username.
 *                     email:
 *                       type: string
 *                       description: The registered email address.
 *       400:
 *         description: Registration error due to validation failure or existing user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for registration failure, such as existing email or username.
 */
router.post('/register' , validator.registerValidator() , controller.validate, controller.register);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user using their email and password. Returns a JWT token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the account.
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the user is successfully logged in.
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token issued for the session.
 *       400:
 *         description: Login error due to invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for login failure, such as invalid email or password.
 */
router.post('/login' , validator.loginValidator() , controller.validate, controller.login);


module.exports = router;