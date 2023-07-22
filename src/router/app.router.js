const { Router } = require('express');
const { userRouter } = require('../components/user/user.router');
const { postRouter } = require('../components/post/post.router');

const appRouter = Router();

appRouter.get('/secret', (req, res) => res.send('SECRET CODE IS: EGY'))
appRouter.use('/users', userRouter)
appRouter.use('/posts', postRouter)

module.exports = {
	appRouter,
};