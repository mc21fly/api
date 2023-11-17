const express = require('express');
const route = express.Router();
const shajs = require('sha.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Utils
const Response = require('../utils/response');

// Models
const UserModel = require('../models/user');

// Middlewares
const validateLogin = require('../middlewares/validateLogin');

route.post('/', validateLogin, async (req, res) => {
	// Destructure request
	const { body } = req;
	const { username, password } = body;

	try {
		// Trim input
		const trimmedUsername = String(username).trim();
		const trimmedPassword = String(password).trim();
		const hashedPassword = shajs('sha256').update(trimmedPassword).digest('hex');

		// Find user
		const foundUser = await UserModel.findOne({
			username: trimmedUsername,
		});

		// Check if user exist
		if (!foundUser) {
			return res.status(404).json(Response(404, 'User not found', { username: trimmedUsername }, 300100));
		}

		// Check if password matches
		const passwordMatch = crypto.timingSafeEqual(
			Buffer.from(foundUser.password, 'hex'),
			Buffer.from(hashedPassword, 'hex')
		);

		if (!passwordMatch) {
			return res.status(401).json(Response(401, 'Incorrect password', { username: trimmedUsername }, 300101));
		}

		// Sign token
		const token = jwt.sign(
			{ id: foundUser._id, username: foundUser.username, name: foundUser.details.name },
			process.env.TOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		);

		// Send Response containing user token
		return res.status(200).json(Response(200, 'User found', { token }));
	} catch (e) {
		res.status(500).json(Response(500, 'Internal server error'));
	}
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
