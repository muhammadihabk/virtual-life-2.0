const knexClient = require('../../../config/db/knex-client');
const { Table, Comment } = require('../../../config/db/db.enums');
const { CommentDefaultSelect } = require('./comment.enums');

module.exports.createCommentRepository = async function createCommentRepository(userId, commentDetails) {
  try {
    commentDetails[Comment.AUTHOR_ID] = userId;

    await knexClient.queryBuilder().insert(commentDetails).into(Table.COMMENT);
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.getCommentsOfPostRepository = async function getCommentsOfPostRepository(inCommentId) {
  try {
    const commentId = isNaN(inCommentId) ? null : inCommentId;
    let commentsIds = knexClient
      .queryBuilder()
      .select([`${Table.COMMENT}.${Comment.ID}`])
      .from(Table.COMMENT)
      .where({
        [Comment.PARENT_COMMENT_ID]: commentId,
      });

    const count_replies_query = knexClient
      .queryBuilder()
      .select([`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID} AS ${Comment.ID}`, knexClient.raw(`COUNT(${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}) AS count_replies`)])
      .from(Table.COMMENT)
      .whereIn(`${Comment.PARENT_COMMENT_ID}`, commentsIds)
      .groupBy(`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}`)
      .as('replies_counts');

    const comments = await knexClient
      .queryBuilder()
      .select(CommentDefaultSelect.map((element) => `${Table.COMMENT}.${element}`).concat(['replies_counts.count_replies']))
      .from(Table.COMMENT)
      .leftJoin(count_replies_query, `${Table.COMMENT}.${Comment.ID}`, `replies_counts.${Comment.ID}`)
      .where({
        [Comment.PARENT_COMMENT_ID]: commentId,
      });

    return comments;
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.updateCommentRepository = async function updateCommentRepository(commentId, commentDetails) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .update(commentDetails)
      .into(Table.COMMENT)
      .where({ [Comment.ID]: commentId });

    return countAffectedRows;
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.deleteCommentRepository = async function deleteCommentRepository(id) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .delete()
      .from(Table.COMMENT)
      .where({ [Comment.ID]: id });

    return countAffectedRows;
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.getCommentByIdRepository = async function getCommentByIdRepository(commentId) {
  try {
    const [comment] = await knexClient
      .queryBuilder()
      .select(CommentDefaultSelect)
      .from(Table.COMMENT)
      .where({
        [Comment.ID]: commentId,
      });

    return comment;
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};
