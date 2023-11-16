// Utils
const Response = require('../utils/response');

// Models
const UserModel = require('../models/user');

async function validateRegister(req, res, next) {
	// Destructure request
	const { body } = req;
	const { username, password, details } = body;

	// Check if 'username' filed exist
	if (!username) {
		return res.status(400).json(Response(400, 'Username required', { username, details }, 100100));
	}

	// Trim input and check if 'username' length is between 3 and 13 characters
	const trimmedUsername = String(username).trim();
	if (trimmedUsername.length < 3 || trimmedUsername.length > 12) {
		return res.status(400).json(Response(400, 'Username length invalid', { username, details }, 100101));
	}

	// Check if user with given 'username' already exist
	const existingUser = await UserModel.findOne({ username: trimmedUsername });
	if (existingUser) {
		return res.status(400).json(Response(400, 'User already exist', { username, details }, 100102));
	}

	// Check if 'password' filed exist
	if (!password) {
		return res.status(400).json(Response(400, 'Password required', { username, details }, 100200));
	}

	// Trim input and check if 'password' length is between 5 and 50 characters
	const trimmedPassword = String(password).trim();
	if (trimmedPassword.length < 5 || trimmedPassword.length > 50) {
		return res.status(400).json(Response(400, 'Password length invalid', { username, details }, 100201));
	}

	// Check if 'name' filed exist
	if (!details || !details.name) {
		return res.status(400).json(Response(400, 'First name required', { username, details }, 100300));
	}

	// Trim input and check if 'name' length is between 2 and 24 characters
	const trimmedName = String(details.name).trim();
	if (trimmedName.length < 2 || trimmedName.length > 24) {
		return res.status(400).json(Response(400, 'First name length invalid', { username, details }, 100301));
	}

	next();
}

module.exports = validateRegister;
