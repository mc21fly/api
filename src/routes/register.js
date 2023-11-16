const express = require('express');
const route = express.Router();
const shajs = require('sha.js');

// Utils
const Response = require('../utils/response');

// Models
const UserModel = require('../models/user');

// Middlewares
const validateRegister = require('../middlewares/validateRegister');

route.post('/', validateRegister, async (req, res) => {
	// Destructure request
	const { body } = req;
	const { username, password, details } = body;

	try {
		// Trim input
		const trimmedUsername = String(username).trim();
		const trimmedPassword = String(password).trim();
		const trimmedName = String(details.name).trim();

		// Hash password
		const hashedPassword = shajs('sha256').update(trimmedPassword).digest('hex');

		//Create new user
		const newUser = new UserModel({
			username: trimmedUsername,
			password: hashedPassword,
			details: {
				name: trimmedName,
			},
		});

		// Save new uesr
		const { _id } = await newUser.save();

		// Send response containing new user id
		res.status(201).json(Response(201, 'User registered', { id: _id }));
	} catch (e) {
		res.status(500).json(Response(500, 'Internal error'));
	}
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
