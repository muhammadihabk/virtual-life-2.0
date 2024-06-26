const express = require('express');
const { ValidateOptions } = require('../../../config/validation/validation.config');
const { createPostSchema, searchPostsSchema, updatePostSchema } = require('./post.validation');
const { createPostService, getPostByIdService, searchPostsService, getHomefeedService, updatePostService, deletePostService } = require('./post.service');
const { errorHandler } = require('../../utilities/errorHandlers/errorHandler');
const { Post } = require('../../../config/db/db.enums');

const router = express.Router();

router.post('/', async function createPost(req, res) {
  try {
    const { value: postDetails, error } = createPostSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const user = req.user;
    await createPostService(user, postDetails);

    res.sendStatus(201);
  } catch (error) {
    console.log('[Post Controller]');
    errorHandler(res, error);
  }
});

router.get('/:id', async function getPostById(req, res) {
  try {
    const post = await getPostByIdService(req.params.id);

    post ? res.json(post) : res.sendStatus(404);
  } catch (error) {
    console.log('[Post Controller]:', error);
    res.sendStatus(500);
  }
});

router.post('/search', async function searchPosts(req, res) {
  try {
    const { value: searchPosts, error } = searchPostsSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }

    const posts = await searchPostsService(searchPosts);
    res.status(200).json(posts);
  } catch (error) {
    console.log('[Post Controller]');
    errorHandler(res, error);
  }
});

router.get('/homefeed/:userId', async function getHomefeed(req, res) {
  try {
    const userId = req.params.userId;
    const paginateOptions = {
      limit: parseInt(req.query?.limit),
      offset: parseInt(req.query?.offset),
    };
    const posts = await getHomefeedService(userId, paginateOptions);

    res.status(200).json(posts);
  } catch (error) {
    console.log('[Post Controller]:', error);
    res.sendStatus(500);
  }
});

router.patch('/:id', async function updatePost(req, res) {
  try {
    const { value: updatePost, error } = updatePostSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const postId = req.params.id;
    const postData = await getPostByIdService(postId);
    if (postData && req.user.id !== postData[Post.AUTHOR_ID]) {
      return res.sendStatus(403);
    }

    const countAffectedRows = await updatePostService(postId, updatePost);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Post Controller]');
    errorHandler(res, error);
  }
});

router.delete('/:id', async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const postData = await getPostByIdService(postId);
    if (postData && req.user.id !== postData[Post.AUTHOR_ID]) {
      return res.sendStatus(403);
    }

    const countAffectedRows = await deletePostService(postId);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Post Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.PostController = router;
