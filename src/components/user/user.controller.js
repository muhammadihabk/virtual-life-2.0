const { users } = require('./user.repository');

function getUsers(req, res) {
	res.status(200).json(users);
}

module.exports = {
	getUsers
};