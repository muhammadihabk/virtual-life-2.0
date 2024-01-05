const knexClient = require('../../../config/db/knex-client');
const { Table, Comment } = require('../../../config/db/db.enums');
const { CommentDefaultSelect } = require('./comment.enums');

module.exports.createCommentRepository = async function createCommentRepository(
  commentDetails
) {
  try {
    // TODO: Use the author id from the token when authentication is implemented
    commentDetails[Comment.AUTHOR_ID] = 1;

    await knexClient.queryBuilder().insert(commentDetails).into(Table.COMMENT);
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.getCommentsRepository = async function getCommentsRepository(
  postId,
  parentCommentId
) {
  try {
    let parentCommentsIds = knexClient
      .queryBuilder()
      .select([`${Table.COMMENT}.${Comment.ID}`])
      .from(Table.COMMENT)
      .where({
        [Comment.POST_ID]: postId,
        [Comment.PARENT_COMMENT_ID]: parentCommentId,
      });

    const count_replies_query = knexClient
      .queryBuilder()
      .select([
        `${Table.COMMENT}.${Comment.PARENT_COMMENT_ID} AS ${Comment.ID}`,
        knexClient.raw(
          `COUNT(${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}) AS count_replies`
        ),
      ])
      .from(Table.COMMENT)
      .where(`${Comment.POST_ID}`, postId)
      .whereIn(`${Comment.PARENT_COMMENT_ID}`, parentCommentsIds)
      .groupBy(`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}`)
      .as('replies_counts');

    const comments = await knexClient
      .queryBuilder()
      .select(CommentDefaultSelect.map((element) => `${Table.COMMENT}.${element}`).concat(['replies_counts.count_replies']))
      .from(Table.COMMENT)
      .leftJoin(
        count_replies_query,
        `${Table.COMMENT}.${Comment.ID}`,
        `replies_counts.${Comment.ID}`
      )
      .where({
        [Comment.POST_ID]: postId,
        [Comment.PARENT_COMMENT_ID]: parentCommentId,
      });

    return comments;
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.updateCommentRepository = async function updateCommentRepository(
  id,
  commentDetails
) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .update(commentDetails)
      .into(Table.COMMENT)
      .where({ [Comment.ID]: id });

    return countAffectedRows;
  } catch (error) {
    console.log('[Comment Repository]:', error);
    throw error;
  }
};

module.exports.deleteCommentRepository = async function deleteCommentRepository(
  id
) {
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
}