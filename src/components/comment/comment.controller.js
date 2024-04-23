const express = require('express');
const { ValidateOptions } = require('../../../config/validation/validation.config');
const { createCommentSchema, updateCommentSchema } = require('./comment.validation');
const { createCommentService, getCommentsService, updateCommentService, deleteCommentService, getCommentByIdService } = require('./comment.service');
const { errorHandler } = require('../../utilities/errorHandlers/errorHandler');
const { Comment } = require('../../../config/db/db.enums');

const router = express.Router();

router.post('/', async function createComment(req, res) {
  try {
    const { value: commentDetails, error } = createCommentSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const userId = req.user.id;
    await createCommentService(userId, commentDetails);

    res.sendStatus(201);
  } catch (error) {
    console.log('[Comment Controller]');
    errorHandler(res, error);
  }
});

router.get('/:parentCommentId', async function getComments(req, res) {
  try {
    const parentCommentId = req.params.parentCommentId;
    const comments = await getCommentsService(parentCommentId);

    res.json(comments);
  } catch (error) {
    console.log('[Comment Controller]:', error);
    res.sendStatus(500);
  }
});

router.patch('/:id', async function updateComment(req, res) {
  try {
    const { value: commentDetails, error } = updateCommentSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const COMMENT_ID = req.params.id;
    const commentData = await getCommentByIdService(COMMENT_ID);
    if (commentData && req.user.id !== commentData[Comment.AUTHOR_ID]) {
      return res.sendStatus(403);
    }

    const countAffectedRows = await updateCommentService(COMMENT_ID, commentDetails);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Comment Controller]');
    errorHandler(res, error);
  }
});

router.delete('/:id', async function deleteComment(req, res) {
  try {
    const COMMENT_ID = req.params.id;
    console.log('\n\n########## com:\n', COMMENT_ID, '\n##########');
    const commentData = await getCommentByIdService(COMMENT_ID);
    if (commentData && req.user.id !== commentData[Comment.AUTHOR_ID]) {
      return res.sendStatus(403);
    }

    const countAffectedRows = await deleteCommentService(COMMENT_ID);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Comment Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.CommentController = router;
