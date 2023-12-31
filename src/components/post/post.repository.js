const {
  Table,
  Post,
  SearchDefaultLimit,
  SearchDefaultOffset,
  Friend,
  Comment,
  Reaction,
} = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { PostDefaultSelect } = require('./post.enums');

module.exports.createPostRepository = async function createPostRepository(
  postDetails
) {
  try {
    // TODO: Remove this line when authentication is implemented
    postDetails[Post.AUTHOR_ID] = 1;

    await knexClient.queryBuilder().insert(postDetails).into(Table.POST);
  } catch (error) {
    console.log('[Post Repository]:', error);
    throw error;
  }
};

module.exports.getPostByIdRepository = async function getPostByIdRepository(
  postId
) {
  try {
    const [post] = await knexClient
      .queryBuilder()
      .select(PostDefaultSelect)
      .from(Table.POST)
      .where({
        [Post.ID]: postId,
      });

    return post;
  } catch (error) {
    console.log('[Post Repository]:', error);
    throw error;
  }
};

module.exports.searchPostsRepository = async function searchPostsRepository(
  searchPosts
) {
  let select = searchPosts.select || PostDefaultSelect;
  const limit = searchPosts.paginate?.limit || SearchDefaultLimit;
  const offset = searchPosts.paginate?.offset || SearchDefaultOffset;
  const sort = searchPosts.sort;

  const commentsCountQuery = getCommentsCountQuery();

  const reactionsCountQuery = getReactionsCountQuery();

  let query = knexClient
    .queryBuilder()
    .select(
      select
        .map((element) => `${Table.POST}.${element}`)
        .concat([
          'comments_counts.count_comments',
          'reactions_counts.count_reactions',
        ])
    )
    .from(Table.POST)
    .leftJoin(
      commentsCountQuery,
      `${Table.POST}.${Post.ID}`,
      'comments_counts.post_id'
    )
    .leftJoin(
      reactionsCountQuery,
      `${Table.POST}.${Post.ID}`,
      'reactions_counts.post_id'
    );

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
    console.log('[Post Repository]:', error);
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
      query.whereRaw(
        `${Table.POST}.${Post.POST_TEXT} LIKE '%${filter[Post.POST_TEXT]}%'`
      );
    }
  }

  return query;
}

module.exports.searchPostsPaginateRepository =
  async function searchPostsPaginateRepository(searchPosts) {
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
      console.log('[Post Repository]:', error);
      throw error;
    }
  };

module.exports.getHomeFeedRepository = async function getHomeFeedRepository(
  userId
) {
  try {
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
    const friends = await knexClient
      .queryBuilder()
      .select([Friend.FRIEND_ID])
      .from(allFriendsSubQuery)
      .where(`${Table.FRIEND}.${Friend.USER_ID}`, userId);

    const commentsCountQuery = getCommentsCountQuery();

    const reactionsCountQuery = getReactionsCountQuery();

    const reactionsDiversityFactorQuery = knexClient
      .queryBuilder()
      .select([
        `${Table.POST}.${Post.ID} AS post_id`,
        knexClient.raw(
          `COUNT(DISTINCT ${Reaction.REACTION_KIND}) AS reactions_diversity_factor`
        ),
      ])
      .from(Table.POST)
      .leftJoin(
        knexClient.raw(
          `${Table.REACTION} ON ${Table.REACTION}.${Reaction.ACTIVITY_ID} = ${Table.POST}.${Post.ID} AND ${Table.REACTION}.${Reaction.ACTIVITY_KIND} = 'post'`
        )
      )
      .groupBy(`${Table.POST}.${Post.ID}`)
      .as('reactions_diversity_factor');

    const posts = await knexClient
      .queryBuilder()
      .select([
        `comments_counts.${Post.AUTHOR_ID}`,
        `comments_counts.${Post.POST_TEXT}`,
        `comments_counts.${Post.POST_IMAGE}`,
        `comments_counts.${Post.CREATED_AT}`,
        `comments_counts.${Post.UPDATED_AT}`,
        'comments_counts.count_comments',
        'reactions_counts.count_reactions',
      ])
      .from(commentsCountQuery)
      .leftJoin(
        reactionsCountQuery,
        'comments_counts.post_id',
        'reactions_counts.post_id'
      )
      .leftJoin(
        reactionsDiversityFactorQuery,
        'comments_counts.post_id',
        'reactions_diversity_factor.post_id'
      )
      .whereIn(
        'comments_counts.author_id',
        friends.map((friend) => friend.friend_id)
      )
      .orderBy('comments_counts.count_comments', 'DESC')
      .orderBy('reactions_diversity_factor.reactions_diversity_factor', 'DESC')
      .orderBy('reactions_counts.count_reactions', 'DESC');

    return posts;
  } catch (error) {
    console.log('[Post Repository]:', error);
    throw error;
  }
};

module.exports.updatePostRepository = async function updatePostRepository(
  postId,
  postDetails
) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .update(postDetails)
      .from(Table.POST)
      .where({ [Post.ID]: postId });

    return countAffectedRows;
  } catch (error) {
    console.log('[Post Repository]:', error);
    throw error;
  }
};

module.exports.deletePostRepository = async function deletePostRepository(
  postId
) {
  try {
    const countDeletedRows = await knexClient
      .queryBuilder()
      .from(Table.POST)
      .del()
      .where({ [Post.ID]: postId });

    return countDeletedRows;
  } catch (error) {
    console.log('[Post Repository]:', error);
    throw error;
  }
};

function getCommentsCountQuery() {
  return knexClient
    .queryBuilder()
    .select([
      `${Table.POST}.${Post.ID} AS post_id`,
      `${Table.POST}.${Post.AUTHOR_ID} AS author_id`,
      `${Table.POST}.${Post.POST_TEXT}`,
      `${Table.POST}.${Post.POST_IMAGE}`,
      `${Table.POST}.${Post.CREATED_AT}`,
      `${Table.POST}.${Post.UPDATED_AT}`,
      knexClient.raw(`COUNT(${Table.COMMENT}.${Comment.ID}) AS count_comments`),
    ])
    .from(Table.POST)
    .leftJoin(
      Table.COMMENT,
      `${Table.COMMENT}.${Comment.POST_ID}`,
      `${Table.POST}.${Post.ID}`
    )
    .groupBy(`${Table.POST}.${Post.ID}`)
    .as('comments_counts');
}

function getReactionsCountQuery() {
  return knexClient
    .queryBuilder()
    .select([
      `${Table.POST}.${Post.ID} AS post_id`,
      knexClient.raw(
        `COUNT(${Table.REACTION}.${Reaction.ID}) AS count_reactions`
      ),
    ])
    .from(Table.POST)
    .leftJoin(
      knexClient.raw(
        `${Table.REACTION} ON ${Table.REACTION}.${Reaction.ACTIVITY_ID} = ${Table.POST}.${Post.ID} AND ${Table.REACTION}.${Reaction.ACTIVITY_KIND} = 'post'`
      )
    )
    .groupBy(`${Table.POST}.${Post.ID}`)
    .as('reactions_counts');
}
