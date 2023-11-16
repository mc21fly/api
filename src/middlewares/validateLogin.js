const Response = require('../utils/response');

async function validateLogin(req, res, next) {
	// Destructure request
	const { body } = req;
	const { username, password } = body;

	// Check if 'username' filed exist
	if (!username) {
		return res.status(400).json(Response(400, 'Username required', { username }, 200100));
	}

	// Trim input and check if 'username' length is between 3 and 13 characters
	const trimmedUsername = String(username).trim();
	if (trimmedUsername.length < 3 || trimmedUsername.length > 12) {
		return res.status(400).json(Response(400, 'Username length invalid', { username }, 200101));
	}

	// Check if 'password' filed exist
	if (!password) {
		return res.status(400).json(Response(400, 'Password required', { username }, 200200));
	}

	// Trim input and check if 'password' length is between 5 and 50 characters
	const trimmedPassword = String(password).trim();
	if (trimmedPassword.length < 5 || trimmedPassword.length > 50) {
		return res.status(400).json(Response(400, 'Password length invalid', { username }, 200201));
	}

	next();
}

module.exports = validateLogin;
