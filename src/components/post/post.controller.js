const express = require('express');
const {
  ValidateOptions,
} = require('../../../config/validation/validation.config');
const { createPostSchema, searchPostsSchema } = require('./post.validation');
const { createPostService, getPostByIdService, searchPostsService } = require('./post.service');

const app = express();

app.post('/', async function createPost(req, res) {
  try {
    const { value: postDetails, error } = createPostSchema.validate(
      req.body,
      ValidateOptions
    );
    if (error) {
      throw error;
    }

    await createPostService(postDetails);
    res.sendStatus(201);
  } catch (error) {
    console.log('[Post Controller]:', error);
    if (error.details) {
      const errorMessages = error.details.map((element) => element.message);
      res.status(400).json(errorMessages);
    } else {
      res.sendStatus(500);
    }
  }
});

app.get('/:id', async function getPostById(req, res) {
  try {
    const post = await getPostByIdService(req.params.id);

    post ? res.json(post) : res.sendStatus(404);
  } catch (error) {
    console.log('[Post Controller]:', error);
    res.sendStatus(500);
  }
});

app.post('/search', async function searchPosts(req, res) {
  try {
    const { value: searchPosts, error } = searchPostsSchema.validate(
      req.body,
      ValidateOptions
    );
    if (error) {
      throw error;
    }

    const posts = await searchPostsService(searchPosts);
    res.status(200).json(posts);
  } catch (error) {
    console.log('[Post Controller]:', error);
    if (error.details) {
      const errorMessages = error.details.map((element) => element.message);
      res.status(400).json(errorMessages);
    } else {
      res.sendStatus(500);
    }
  }
});

module.exports.PostController = app;
