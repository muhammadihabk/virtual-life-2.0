const { Router } = require('express');
const { posts } = require('./post.repository');

const postController = Router();

postController.get('/', function getAllPosts(req, res) {
	res.status(200).json(posts);
});

module.exports = {
	postController
};