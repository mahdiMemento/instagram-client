const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {followUser , followTag } = require('./../../../middlewares/follow');
const {unfollowUser , unfollowTag } = require('./../../../middlewares/unfollow');



/**
 * @swagger
 * /api/user/search/hashtag:
 *   get:
 *     summary: Search posts by hashtag
 *     description: Retrieves posts that contain the specified hashtag, sorted by creation date in descending order.
 *     parameters:
 *       - in: query
 *         name: hashtag
 *         required: true
 *         description: The hashtag to search for in the posts.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of posts containing the specified hashtag.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   caption:
 *                     type: string
 *                     description: The caption of the post.
 *                   likes:
 *                     type: number
 *                     description: The number of likes on the post.
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
 *         description: No posts found with the specified hashtag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that no posts were found with the specified hashtag.
 */
router.get('/hashtag', controller.hashtag);


/**
 * @swagger
 * /api/user/search/username:
 *   get:
 *     summary: Search posts by username
 *     description: Retrieves posts created by a user, identified by username, sorted by creation date in descending order.
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: The username of the user whose posts are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of posts created by the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   caption:
 *                     type: string
 *                     description: The caption of the post.
 *                   likes:
 *                     type: number
 *                     description: The number of likes on the post.
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
 *         description: No posts found for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that no posts were found for the specified user.
 */
router.get('/username' , controller.showPost);



/**
 * @swagger
 * /api/user/search/username:
 *   post:
 *     summary: Follow a user by username
 *     description: Follows a user specified by the username provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user to follow.
 *     responses:
 *       200:
 *         description: User followed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the user has been followed.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the user was not found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating there was a problem processing the request.
 */
router.post('/username' , followUser);


/**
 * @swagger
 * /api/user/search/hashtag:
 *   post:
 *     summary: Follow a hashtag
 *     description: Marks all posts containing the specified hashtag as followed by adding the hashtag to the 'followedTags' array of each post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hashtag
 *             properties:
 *               hashtag:
 *                 type: string
 *                 description: The hashtag to follow.
 *     responses:
 *       200:
 *         description: Hashtag followed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the hashtag has been followed.
 *       404:
 *         description: No posts found with the specified hashtag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating no posts were found with the specified hashtag.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating there was a problem processing the request.
 */ 
router.post('/hashtag' , followTag);


/**
 * @swagger
 * /api/user/search/username:
 *   put:
 *     summary: Unfollow a user by username
 *     description: Unfollows a user specified by the username provided in the request body by setting the 'isFollowed' flag to false.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user to unfollow.
 *     responses:
 *       200:
 *         description: User unfollowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the user has been unfollowed.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the user was not found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating there was a problem processing the request.
 */
router.put('/username' , unfollowUser);

/**
 * @swagger
 * /api/user/search/hashtag:
 *   put:
 *     summary: Unfollow a hashtag
 *     description: Removes a hashtag from the 'followedTags' array of all posts that currently include it, effectively unfollowing the hashtag.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hashtag
 *             properties:
 *               hashtag:
 *                 type: string
 *                 description: The hashtag to unfollow.
 *     responses:
 *       200:
 *         description: Hashtag unfollowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message stating the hashtag has been unfollowed.
 *       404:
 *         description: No posts found with the specified hashtag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating no posts were found with the specified hashtag.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating there was a problem processing the request.
 */
router.put('/hashtag' , unfollowTag);



module.exports = router;