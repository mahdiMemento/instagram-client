const express = require('express');
const router = express.Router();
const controller = require('./controller');





/**
 * @swagger
 * /api/user/home/hashtag:
 *   get:
 *     summary: Retrieve posts by followed hashtags
 *     description: Returns a list of posts that are tagged with hashtags followed by the user, sorted by creation date.
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   likes:
 *                     type: number
 *                     description: The number of likes the post has received.
 *                   userName:
 *                     type: string
 *                     description: The username of the post creator.
 *                   caption:
 *                     type: string
 *                     description: The caption of the post.
 *                   hashTags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of hashtags associated with the post.
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                           description: The username of the user who commented.
 *                         comment:
 *                           type: string
 *                           description: The comment text.
 *       404:
 *         description: No posts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating no followed hashtags were found.
 */
router.get('/hashtag', controller.hashtag);


/**
 * @swagger
 * /api/user/home/username:
 *   get:
 *     summary: Retrieve posts from followed users
 *     description: Fetches posts created by users who are followed by the current user, sorted by creation date in descending order.
 *     responses:
 *       200:
 *         description: An array of posts from followed users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   likes:
 *                     type: number
 *                     description: The number of likes on the post.
 *                   userName:
 *                     type: string
 *                     description: The username of the post creator.
 *                   caption:
 *                     type: string
 *                     description: The caption of the post.
 *                   hashTags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of hashtags associated with the post.
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         userName:
 *                           type: string
 *                           description: The username of the user who commented.
 *                         comment:
 *                           type: string
 *                           description: The comment text.
 *       400:
 *         description: No followed user posts found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating there are no posts from followed users.
 */
router.get('/username', controller.usersPosts);

module.exports = router;