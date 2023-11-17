// Utils
const Response = require('../utils/response');

function authenticateUser(req, res, next) {
	// Destructure request
	const { params } = req;
	const { user } = res.locals;

	// Check if the username in the user object matches the one in params
	if (user.username !== params.username) {
		return res.status(401).json(Response(401, 'Unauthorized'));
	}

	next();
}

module.exports = authenticateUser;
