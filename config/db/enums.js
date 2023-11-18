module.exports.Table = {
  VIRTUAL_LIFE_USER: 'virtual_life_user',
  FRIEND: 'friend',
  POST: 'post',
  REACTION: 'reaction',
  COMMENT: 'comment',
};

/* _____________________ Tables _____________________ */

module.exports.VirtualLifeUser = {
  ID: 'id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  DOB: 'dob',
};

module.exports.Friend = {
  VIRTUAL_LIFE_USER_ID: 'virtual_life_user_id',
  FRIEND_ID: 'friend_id',
  CREATED_AT: 'created_at',
};

module.exports.Post = {
  ID: 'id',
  AUTHOR_ID: 'author_id',
  POST_TEXT: 'post_text',
  POST_IMAGE: 'post_image',
  REACTIONS_COUNTS: 'reactions_counts',
  COMMENTS_COUNT: 'comments_count',
  IS_ACTIVE: 'is_active',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

module.exports.Reaction = {
  ID: 'id',
  AUTHOR_ID: 'author_id',
  ACTIVITY_ID: 'activity_id',
  REACTION_KIND: 'reaction_kind',
  ACTIVITY_KIND: 'activity_kind',
};

module.exports.Comment = {
  ID: 'id',
  AUTHOR_ID: 'author_id',
  POST_ID: 'post_id',
  PARENT_COMMENT_ID: 'parent_comment_id',
  COMMENT_TEXT: 'comment_text',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
}

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
