const express = require('express');
const router = express.Router();
const controller = require('./controller');


/**
 * @swagger
 * /api/user/create/:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post with the provided caption, user ID, and hashtags.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - caption
 *               - userId
 *               - hashtags
 *             properties:
 *               caption:
 *                 type: string
 *                 description: The caption for the post.
 *               userId:
 *                 type: string
 *                 description: The user ID of the post creator.
 *               hashtags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of hashtags associated with the post.
 *     responses:
 *       200:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the post has been created.
 *       400:
 *         description: Error in creating the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure in post creation.
 */
router.post('/', controller.createPost);

module.exports = router;