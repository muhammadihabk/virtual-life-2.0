export enum Table {
  USER = 'user',
  FRIEND = 'friend',
  POST = 'post',
  REACTION = 'reaction',
  COMMENT = 'comment',
}

/* _____________________ Tables _____________________ */

export enum User {
  ID = 'id',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  SALT = 'salt',
  HASH = 'hash',
  DOB = 'dob',
}

export enum Friend {
  USER_ID = 'userId',
  FRIEND_ID = 'friendId',
  CREATED_AT = 'createdAt',
}

export enum Post {
  ID = 'id',
  AUTHOR_ID = 'authorId',
  POST_TEXT = 'postText',
  POST_IMAGE = 'postImage',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum Reaction {
  ID = 'id',
  AUTHOR_ID = 'authorId',
  ACTIVITY_ID = 'activityId',
  REACTION_KIND = 'reactionKind',
  ACTIVITY_KIND = 'activityKind',
}

export enum Comment {
  ID = 'id',
  AUTHOR_ID = 'authorId',
  POST_ID = 'postId',
  PARENT_COMMENT_ID = 'parentCommentId',
  COMMENT_TEXT = 'commentText',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

/* _____________________ Columns _____________________ */

export enum ReactionReactionKind {
  LIKE = 'like',
  LOVE = 'love',
  SAD = 'sad',
  LAUGH = 'laugh',
  ANGRY = 'angry',
}

export enum ReactionActivityKind {
  POST = 'post',
  COMMENT = 'comment',
}

/* _____________________ Altered Columns _____________________ */
/**
 * These columns were dropped of their corresponding tables.
 */
export enum AlterPost {
  REACTIONS_COUNTS = 'reactionsCounts',
  COMMENTS_COUNT = 'commentsCount',
  IS_ACTIVE = 'isActive',
}

export enum AlterUser {
  PASSWORD = 'userPassword',
}

/* _____________________ Query Defaults _____________________ */
export const SearchDefaultLimit = 25;
export const SearchDefaultOffset = 0;

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
