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

router.get('/:commentId', async function getComments(req, res) {
  try {
    const commentId = req.params.commentId;
    const comments = await getCommentsService(commentId);

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
    const currentComment = await getCommentByIdService(COMMENT_ID);
    if (req.user.id !== currentComment[Comment.AUTHOR_ID]) {
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
    const currentComment = await getCommentByIdService(COMMENT_ID);
    if (!currentComment) {
      return res.sendStatus(404);
    }
    if (req.user.id !== currentComment?.[Comment.AUTHOR_ID]) {
      return res.sendStatus(403);
    }

    await deleteCommentService(COMMENT_ID);

    res.sendStatus(200);
  } catch (error) {
    console.log('[Comment Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.CommentController = router;
