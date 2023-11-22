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
	try {
		const { username } = req.params;

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

	try {
		let fieldsToUpdate = {};

		// Validate input
		if (body.details && body.details.name) {
			const validated = await UserModel.validate(body, ['details.name']);
			fieldsToUpdate.details = validated.details;
		}

		if (body.password) {
			const validated = await UserModel.validate(body, ['password']);
			fieldsToUpdate.password = validated.password;
		}

		// Check if there are some fields to update
		if (!Object.entries(fieldsToUpdate).length) {
			return res.status(400).json(Response(400, 'Fields to update required'));
		}

		// Update requested fields
		await UserModel.updateOne({ username }, fieldsToUpdate);

		// Find updated user
		const updatedUser = await UserModel.findOne({ username }).select('-password');

		// Send Response with updated user
		res.status(200).json(Response(200, 'User updated', updatedUser));
	} catch (e) {
		if (e.name === 'ValidationError') {
			return res.status(400).json(Response(400, e.message));
		}
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
