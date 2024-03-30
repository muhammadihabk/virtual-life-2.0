const express = require('express');
const { createReactionSchema } = require('./reaction.validation');
const { createReactionService, getReactionsOfActivityService, deleteReactionsOfActivityService } = require('./reaction.service');
const { ValidateOptions } = require('../../../config/validation/validation.config');
const { internalErrorHandler } = require('../../utilities/errorHandlers/internalErrorHandler');

const router = express.Router();

router.post('/', async function createReaction(req, res) {
  try {
    const { value: reactionDetails, error } = createReactionSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const user = req.user;
    await createReactionService(user, reactionDetails);

    res.sendStatus(201);
  } catch (error) {
    console.log('[Reaction Controller]');
    internalErrorHandler(res, error);
  }
});

router.get('/:activityKind/:id', async function getReactionsOfActivity(req, res) {
  try {
    const reactions = await getReactionsOfActivityService(req.params.id, req.params.activityKind);

    res.json(reactions);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

router.delete('/:activityKind/:id', async function deleteReactionsOfActivity(req, res) {
  try {
    const countAffectedRows = await deleteReactionsOfActivityService(req.user, req.params.id, req.params.activityKind);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.ReactionController = router;
