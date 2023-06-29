const { Router } = require("express");
const { users } = require('./user.repository');

const userController = Router();

userController.get('/', function getAllUsers(req, res) {
	res.status(200).json(users);
});

module.exports = {
	userController
};