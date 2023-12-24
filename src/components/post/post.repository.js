const {
  Table,
  Post,
  SearchDefaultLimit,
  SearchDefaultOffset,
} = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { PostDefaultSelect } = require('./post.enums');

module.exports.createPostRepository = async function createPostRepository(
  postDetails
) {
  try {
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

  let query = knexClient.queryBuilder().select(select).from(Table.POST);

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
