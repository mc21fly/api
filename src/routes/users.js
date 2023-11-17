const express = require('express');
const route = express.Router();
const shajs = require('sha.js');

// Utils
const Response = require('../utils/response');

// Models
const UserModel = require('../models/user');

// Middlewares
const authenticateUser = require('../middlewares/authenticateUser');

route.get('/:username', async (req, res) => {
	// Destructure request
	const { params } = req;
	const { username } = params;

	try {
		// Find user
		const foundUser = await UserModel.findOne({ username }).select('-password');

		// Check if user is found
		if (!foundUser) {
			return res.status(404).json(Response(404, 'User not found', { username }));
		}

		// Send Response containing found user
		res.status(200).json(Response(200, 'User found', foundUser));
	} catch (e) {
		res.status(500).json(Response(500, 'Internal server error'));
	}
});

route.put('/:username', authenticateUser, async (req, res) => {
	// Destructure request
	const { username } = res.locals.user;
	const { body } = req;
	const { password, details } = body;

	console.log(password, details);

	try {
		let fieldsToUpdate = {};

		// Check if at least one field is present
		if (!password && !details) {
			return res.status(400).json(Response(400, 'At least one field requested'));
		}

		// Validate 'password'
		if (password) {
			// Trim 'password'
			const trimmedPassword = String(password).trim();

			// Check trimmed password length
			if (trimmedPassword.length < 5 || trimmedPassword.length > 50) {
				return res.status(400).json(Response(400, 'Password length invalid'));
			}

			// Hash password
			const hashedPassword = shajs('sha256').update(trimmedPassword).digest('hex');

			fieldsToUpdate.password = hashedPassword;
		}

		// Validate 'details.name'
		if (details) {
			// Check if 'name' field is present
			if (!details.name) {
				return res.status(400).json(Response(400, 'First name required'));
			}

			// Trim 'name'
			const trimmedName = String(details.name).trim();

			// Check trimmed name
			if (trimmedName.length < 2 || trimmedName > 24) {
				return res.status(400).json(Response(400, 'First name length invalid'));
			}

			fieldsToUpdate.details = {
				name: trimmedName,
			};
		}

		// Update requested fields
		await UserModel.updateOne({ username }, fieldsToUpdate);

		// Find updated user
		const updatedUser = await UserModel.findOne({ username }).select('-password');

		// Send Response with updated user
		res.status(200).json(Response(200, 'User updated', updatedUser));
	} catch (e) {
		res.status(500).json(Response(500, 'Internal server error'));
	}
});

route.delete('/:username', authenticateUser, (req, res) => {
	res.status(200).json({ method: 'DELETE' });
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
