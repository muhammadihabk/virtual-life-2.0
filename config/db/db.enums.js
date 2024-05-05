module.exports.Table = {
  USER: 'user',
  FRIEND: 'friend',
  POST: 'post',
  REACTION: 'reaction',
  COMMENT: 'comment',
};

/* _____________________ Tables _____________________ */

module.exports.User = {
  ID: 'id',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  SALT: 'salt',
  HASH: 'hash',
  DOB: 'dob',
};

module.exports.Friend = {
  USER_ID: 'userId',
  FRIEND_ID: 'friendId',
  CREATED_AT: 'createdAt',
};

module.exports.Post = {
  ID: 'id',
  AUTHOR_ID: 'authorId',
  POST_TEXT: 'postText',
  POST_IMAGE: 'postImage',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

module.exports.Reaction = {
  ID: 'id',
  AUTHOR_ID: 'authorId',
  ACTIVITY_ID: 'activityId',
  REACTION_KIND: 'reactionKind',
  ACTIVITY_KIND: 'activityKind',
};

module.exports.Comment = {
  ID: 'id',
  AUTHOR_ID: 'authorId',
  POST_ID: 'postId',
  PARENT_COMMENT_ID: 'parentCommentId',
  COMMENT_TEXT: 'commentText',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

/* _____________________ Columns _____________________ */

module.exports.ReactionReactionKind = {
  LIKE: 'like',
  LOVE: 'love',
  SAD: 'sad',
  LAUGH: 'laugh',
  ANGRY: 'angry',
};

module.exports.ReactionActivityKind = {
  POST: 'post',
  COMMENT: 'comment',
};

/* _____________________ Altered Columns _____________________ */
/**
 * These columns were dropped of their corresponding tables.
 */
module.exports.AlterPost = {
  REACTIONS_COUNTS: 'reactionsCounts',
  COMMENTS_COUNT: 'commentsCount',
  IS_ACTIVE: 'isActive',
};

module.exports.AlterUser = {
  PASSWORD: 'userPassword',
};

/* _____________________ Query Defaults _____________________ */
module.exports.SearchDefaultLimit = 25;
module.exports.SearchDefaultOffset = 0;

module.exports.SortOrder = ['asc', 'desc'];
