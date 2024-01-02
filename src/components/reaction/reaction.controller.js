const express = require('express');
const { createReactionSchema } = require('./reaction.validation');
const { createReactionService, getReactionsOfActivityService, deleteReactionsOfActivityService } = require('./reaction.service');
const {
  ValidateOptions,
} = require('../../../config/validation/validation.config');
const { ReactionActivityKind } = require('../../../config/db/db.enums');

const app = express();

app.post('/', async function createReaction(req, res) {
  try {
    const { value: reactionDetails, error } = createReactionSchema.validate(
      req.body,
      ValidateOptions
    );
    if (error) {
      throw error;
    }

    await createReactionService(reactionDetails);
    res.sendStatus(201);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    if (error.details) {
      const errorMessages = error.details.map((element) => element.message);
      res.status(400).json(errorMessages);
    } else {
      res.sendStatus(500);
    }
  }
});

app.get('/post/:id', async function getReactionsOfPost(req, res) {
  try {
    const activityKind = ReactionActivityKind.POST;
    const reactions = await getReactionsOfActivityService(
      req.params.id,
      activityKind
    );

    res.json(reactions);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

app.get('/comment/:id', async function getReactionsOfComment(req, res) {
  try {
    const activityKind = ReactionActivityKind.COMMENT;
    const reactions = await getReactionsOfActivityService(
      req.params.id,
      activityKind
    );

    res.json(reactions);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

app.delete('/post/:id', async function deleteReactionsOfPost(req, res) {
  try {
    const activityKind = ReactionActivityKind.POST;
    const countAffectedRows = await deleteReactionsOfActivityService(
      req.params.id,
      activityKind
    );

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

app.delete('/comment/:id', async function deleteReactionsOfComment(req, res) {
  try {
    const activityKind = ReactionActivityKind.COMMENT;
    const countAffectedRows = await deleteReactionsOfActivityService(
      req.params.id,
      activityKind
    );

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Reaction Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.ReactionsController = app;
