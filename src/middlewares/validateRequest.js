// Utils
const Response = require('../utils/Response');

// Models
const UserModel = require('../models/user');

async function validateRequest(req, res, next) {
	// Destructure request
	const { originalUrl, method, body } = req;

	// Validare '/register'
	if (originalUrl === '/register') {
	}
}

module.exports = validateRequest;
