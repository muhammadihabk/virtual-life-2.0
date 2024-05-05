const { Table, Post, SearchDefaultLimit, SearchDefaultOffset, Friend, Comment, Reaction } = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { PostDefaultSelect } = require('./post.enums');

module.exports.createPostRepository = async function createPostRepository(user, postDetails) {
  try {
    postDetails[Post.AUTHOR_ID] = user.id;

    await knexClient.queryBuilder().insert(postDetails).into(Table.POST);
  } catch (error) {
    console.log('[Post Repository]');
    throw error;
  }
};

module.exports.getPostByIdRepository = async function getPostByIdRepository(postId) {
  try {
    const [post] = await knexClient
      .queryBuilder()
      .select(PostDefaultSelect)
      .from(Table.POST)
      .where({
        [Post.ID]: postId,
      });

    let parentCommentsIds = await knexClient
      .queryBuilder()
      .select([`${Table.COMMENT}.${Comment.ID}`])
      .from(Table.COMMENT)
      .where({
        [Comment.POST_ID]: postId,
        [Comment.PARENT_COMMENT_ID]: null,
      });

    parentCommentsIds = parentCommentsIds.map((element) => element[Comment.ID]);

    const count_replies_query = knexClient
      .queryBuilder()
      .select([`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}`, knexClient.raw(`COUNT(${Table.COMMENT}.${Comment.ID}) AS count_replies`)])
      .from(Table.COMMENT)
      .whereIn(`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}`, parentCommentsIds)
      .groupBy(`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}`)
      .as('replies_counts');

    const comments = await knexClient
      .queryBuilder()
      .select([
        `${Table.COMMENT}.${Comment.ID}`,
        `${Table.COMMENT}.${Comment.AUTHOR_ID}`,
        `${Table.COMMENT}.${Comment.COMMENT_TEXT}`,
        'replies_counts.count_replies',
        `${Table.COMMENT}.${Comment.CREATED_AT}`,
        `${Table.COMMENT}.${Comment.UPDATED_AT}`,
      ])
      .from(Table.COMMENT)
      .leftJoin(count_replies_query, `${Table.COMMENT}.${Comment.ID}`, `replies_counts.${Comment.PARENT_COMMENT_ID}`)
      .where({
        [Comment.POST_ID]: postId,
        [`${Table.COMMENT}.${Comment.PARENT_COMMENT_ID}`]: null,
      });

    return { post, comments };
  } catch (error) {
    console.log('[Post Repository]');
    throw error;
  }
};

module.exports.searchPostsRepository = async function searchPostsRepository(searchPosts) {
  let select = searchPosts.select || PostDefaultSelect;
  const limit = searchPosts.paginate?.limit || SearchDefaultLimit;
  const offset = searchPosts.paginate?.offset || SearchDefaultOffset;
  const sort = searchPosts.sort;

  const commentsCountQuery = getCommentsCountQuery();

  const reactionsCountQuery = getReactionsCountQuery();

  let query = knexClient
    .queryBuilder()
    .select(select.map((element) => `${Table.POST}.${element}`).concat([`${Table.POST}.${Post.ID} AS postId`, 'commentsCounts.count_comments', 'reactionsCounts.count_reactions']))
    .from(Table.POST)
    .leftJoin(commentsCountQuery, `${Table.POST}.${Post.ID}`, 'commentsCounts.postId')
    .leftJoin(reactionsCountQuery, `${Table.POST}.${Post.ID}`, 'reactionsCounts.postId');

  query = applyPostFilter(query, searchPosts);

  query.limit(limit);
  query.offset(offset);

  if (sort) {
    sort.forEach((element) => {
      query.orderBy(`post.${element.orderBy}`, element.sortOrder);
    });
  }

  try {
    const posts = await query;

    return posts;
  } catch (error) {
    console.log('[Post Repository]');
    throw error;
  }
};

function applyPostFilter(query, searchPosts) {
  const filter = searchPosts.filter;

  if (filter) {
    if (filter[Post.AUTHOR_ID]) {
      query.where(`${Table.POST}.${Post.AUTHOR_ID}`, filter[Post.AUTHOR_ID]);
    }
    if (filter[Post.POST_TEXT]) {
      query.whereRaw(`${Table.POST}.${Post.POST_TEXT} LIKE '%${filter[Post.POST_TEXT]}%'`);
    }
  }

  return query;
}

module.exports.searchPostsPaginateRepository = async function searchPostsPaginateRepository(searchPosts) {
  const limit = searchPosts.paginate?.limit || SearchDefaultLimit;
  const offset = searchPosts.paginate?.offset || SearchDefaultOffset;

  let query = knexClient.queryBuilder().from(Table.POST);

  query = applyPostFilter(query, searchPosts);

  try {
    const [{ count }] = await query.count(`${Post.ID} AS count`);

      return {
        count,
        limit,
        offset,
      };
    } catch (error) {
      console.log('[Post Repository]');
      throw error;
    }
  };

module.exports.getHomefeedRepository = async function getHomefeedRepository(userId, paginateOptions) {
  const limit = paginateOptions.limit || SearchDefaultLimit;
  const offset = paginateOptions.offset || SearchDefaultOffset;
  const allFriendsSubQuery = knexClient
    .queryBuilder()
    .select([Friend.USER_ID, Friend.FRIEND_ID])
    .from(Table.FRIEND)
    .union(function () {
      this.select([Friend.FRIEND_ID, Friend.USER_ID]);
      this.from(Table.FRIEND);
    })
    .as(`${Table.FRIEND}`)
    .where(`${Table.FRIEND}.${Friend.USER_ID}`, userId);
  const friends = await knexClient.queryBuilder().select([Friend.FRIEND_ID]).from(allFriendsSubQuery).where(`${Table.FRIEND}.${Friend.USER_ID}`, userId);

  const commentsCountQuery = getCommentsCountQuery();

  const reactionsCountQuery = getReactionsCountQuery();

  const reactionsDiversityFactorQuery = knexClient
    .queryBuilder()
    .select([`${Table.POST}.${Post.ID} AS postId`, knexClient.raw(`COUNT(DISTINCT ${Reaction.REACTION_KIND}) AS reactions_diversity_factor`)])
    .from(Table.POST)
    .leftJoin(knexClient.raw(`${Table.REACTION} ON ${Table.REACTION}.${Reaction.ACTIVITY_ID} = ${Table.POST}.${Post.ID} AND ${Table.REACTION}.${Reaction.ACTIVITY_KIND} = 'post'`))
    .groupBy(`${Table.POST}.${Post.ID}`)
    .as('reactions_diversity_factor');

  let query = knexClient
    .queryBuilder()
    .select([
      'commentsCounts.postId',
      `commentsCounts.${Post.AUTHOR_ID}`,
      `commentsCounts.${Post.POST_TEXT}`,
      `commentsCounts.${Post.POST_IMAGE}`,
      `commentsCounts.${Post.CREATED_AT}`,
      `commentsCounts.${Post.UPDATED_AT}`,
      'commentsCounts.count_comments',
      'reactionsCounts.count_reactions',
    ])
    .from(commentsCountQuery)
    .leftJoin(reactionsCountQuery, 'commentsCounts.postId', 'reactionsCounts.postId')
    .leftJoin(reactionsDiversityFactorQuery, 'commentsCounts.postId', 'reactions_diversity_factor.postId')
    .whereIn(
      'commentsCounts.authorId',
      friends.map((friend) => friend.friendId)
    )
    .orderBy('commentsCounts.count_comments', 'DESC')
    .orderBy('reactions_diversity_factor.reactions_diversity_factor', 'DESC')
    .orderBy('reactionsCounts.count_reactions', 'DESC');

  query.limit(limit);
  query.offset(offset);

  try {
    const posts = await query;

    return posts;
  } catch (error) {
    console.log('[Post Repository]');
    throw error;
  }
};

module.exports.getHomefeedPaginateRepository = async function getHomefeedPaginateRepository(userId, paginateOptions) {
  const limit = paginateOptions.limit || SearchDefaultLimit;
  const offset = paginateOptions.offset || SearchDefaultOffset;

  const allFriendsSubQuery = knexClient
    .queryBuilder()
    .select([Friend.USER_ID, Friend.FRIEND_ID])
    .from(Table.FRIEND)
    .union(function () {
      this.select([Friend.FRIEND_ID, Friend.USER_ID]);
      this.from(Table.FRIEND);
    })
    .as(`${Table.FRIEND}`)
    .where(`${Table.FRIEND}.${Friend.USER_ID}`, userId);
  const friends = await knexClient.queryBuilder().select([Friend.FRIEND_ID]).from(allFriendsSubQuery).where(`${Table.FRIEND}.${Friend.USER_ID}`, userId);

    let query = knexClient
      .queryBuilder()
      .from(Table.POST)
      .whereIn(
        `${Table.POST}.${Post.AUTHOR_ID}`,
        friends.map((friend) => friend.friend_id)
      );

    try {
      const [{ count }] = await query.count(`${Post.ID} AS count`);

      return {
        count,
        limit,
        offset,
      };
    } catch (error) {
      console.log('[Post Repository]');
      throw error;
    }
  };

module.exports.updatePostRepository = async function updatePostRepository(postId, postDetails) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .update(postDetails)
      .from(Table.POST)
      .where({ [Post.ID]: postId });

    return countAffectedRows;
  } catch (error) {
    console.log('[Post Repository]');
    throw error;
  }
};

module.exports.deletePostRepository = async function deletePostRepository(id) {
  try {
    const countDeletedRows = await knexClient
      .queryBuilder()
      .from(Table.POST)
      .del()
      .where({ [Post.ID]: id });

    return countDeletedRows;
  } catch (error) {
    console.log('[Post Repository]');
    throw error;
  }
};

function getCommentsCountQuery() {
  return knexClient
    .queryBuilder()
    .select([
      `${Table.POST}.${Post.ID} AS postId`,
      `${Table.POST}.${Post.AUTHOR_ID} AS authorId`,
      `${Table.POST}.${Post.POST_TEXT}`,
      `${Table.POST}.${Post.POST_IMAGE}`,
      `${Table.POST}.${Post.CREATED_AT}`,
      `${Table.POST}.${Post.UPDATED_AT}`,
      knexClient.raw(`COUNT(${Table.COMMENT}.${Comment.ID}) AS count_comments`),
    ])
    .from(Table.POST)
    .leftJoin(Table.COMMENT, `${Table.COMMENT}.${Comment.POST_ID}`, `${Table.POST}.${Post.ID}`)
    .groupBy(`${Table.POST}.${Post.ID}`)
    .as('commentsCounts');
}

function getReactionsCountQuery() {
  return knexClient
    .queryBuilder()
    .select([`${Table.POST}.${Post.ID} AS postId`, knexClient.raw(`COUNT(${Table.REACTION}.${Reaction.ID}) AS count_reactions`)])
    .from(Table.POST)
    .leftJoin(knexClient.raw(`${Table.REACTION} ON ${Table.REACTION}.${Reaction.ACTIVITY_ID} = ${Table.POST}.${Post.ID} AND ${Table.REACTION}.${Reaction.ACTIVITY_KIND} = 'post'`))
    .groupBy(`${Table.POST}.${Post.ID}`)
    .as('reactionsCounts');
}
