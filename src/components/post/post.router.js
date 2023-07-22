const { Router } = require('express');
const { getPosts } = require('./post.controller');

const postRouter = Router();

postRouter.get('/', getPosts);

module.exports = {
	postRouter
}