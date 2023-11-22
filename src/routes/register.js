const express = require('express');
const route = express.Router();

// Utils
const Response = require('../utils/response');

// Models
const UserModel = require('../models/user');

route.post('/', async (req, res) => {
	// Destructure request
	const { body } = req;

	try {
		// Validate input
		const validated = await UserModel.validate(body, ['username', 'password', 'details.name']);

		// Save new user
		const { _id } = await new UserModel(validated).save();

		// Send response containing new user id
		res.status(201).json(Response(201, 'User registered', { id: _id }));
	} catch (e) {
		if (e.name === 'ValidationError') {
			return res.status(400).json(Response(400, e.message));
		}

		if (e.name === 'MongoServerError') {
			return res.status(409).json(Response(409, 'User already exist'));
		}

		console.log(e);
		res.status(500).json(Response(500, 'Internal server error'));
	}
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
