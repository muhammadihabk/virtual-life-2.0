const express = require('express');
const { ValidateOptions } = require('../../../config/validation/validation.config');
const { createCommentSchema, updateCommentSchema } = require('./comment.validation');
const { createCommentService, getCommentsService, updateCommentService, deleteCommentService } = require('./comment.service');
const { internalErrorHandler } = require('../../utilities/errorHandlers/internalErrorHandler');

const app = express();

app.post('/', async function createComment(req, res) {
  try {
    const { value: commentDetails, error } = createCommentSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }

    await createCommentService(commentDetails);
    res.sendStatus(201);
  } catch (error) {
    console.log('[Comment Controller]');
    internalErrorHandler(res, error);
  }
});

app.get('/:commentId', async function getComments(req, res) {
  try {
    const commentId = req.params.commentId;
    const comments = await getCommentsService(commentId);

    res.json(comments);
  } catch (error) {
    console.log('[Comment Controller]:', error);
    res.sendStatus(500);
  }
});

app.patch('/:id', async function updateComment(req, res) {
  try {
    const { value: commentDetails, error } = updateCommentSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const countAffectedRows = await updateCommentService(req.params.id, commentDetails);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Comment Controller]');
    internalErrorHandler(res, error);
  }
});

app.delete('/:id', async function deleteComment(req, res) {
  try {
    const countAffectedRows = await deleteCommentService(req.params.id);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Comment Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.CommentController = app;
