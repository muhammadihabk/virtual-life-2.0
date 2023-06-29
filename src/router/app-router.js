const { Router } = require('express');
const { userController } = require('../components/user/user.controller');
const { postController } = require('../components/post/post.controller');

const appRouter = Router();

appRouter.get('/secret', (req, res) => res.send('SECRET CODE IS: EGY'))
appRouter.use('/users', userController)
appRouter.use('/posts', postController)

module.exports = {
	appRouter,
};