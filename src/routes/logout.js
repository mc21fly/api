const express = require('express');
const route = express.Router();

// Utils
const Response = require('../utils/response');

route.post('/', (req, res) => {
	res.status(200).json(Response(200, 'Logout sucessfull'));
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
