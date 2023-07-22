const { posts } = require('./post.repository');

function getPosts(req, res) {
	res.status(200).json(posts);
};

module.exports = {
	getPosts
};