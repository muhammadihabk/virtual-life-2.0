const express = require('express');
const { createReactionSchema } = require('./reaction.validation');
const { createReactionService, getReactionsOfActivityService, deleteReactionsOfActivityService, getReactionByIdService } = require('./reaction.service');
const { ValidateOptions } = require('../../../config/validation/validation.config');
const { errorHandler } = require('../../utilities/errorHandlers/errorHandler');
const { Reaction } = require('../../../config/db/db.enums');

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
    errorHandler(res, error);
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

router.delete('/:id', async function deleteReactionsOfActivity(req, res) {
  try {
    const REACTION_ID = req.params.id;
    const currentReaction = await getReactionByIdService(REACTION_ID);
    if (!currentReaction) {
      return res.sendStatus(404);
    }
    if (req.user.id !== currentReaction[Reaction.AUTHOR_ID]) {
      return res.sendStatus(403);
    }

    await deleteReactionsOfActivityService(req.user, REACTION_ID);

    res.sendStatus(200);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.ReactionController = router;
