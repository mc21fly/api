const express = require('express');
const route = express.Router();

// Utils
const Response = require('../utils/response');

route.get('/', (req, res) => {
	res.status(200).json({ method: 'GET' });
});

route.post('/', (req, res) => {
	res.status(200).json({ method: 'POST' });
});

route.put('/', (req, res) => {
	res.status(200).json({ method: 'PUT' });
});

route.delete('/', (req, res) => {
	res.status(200).json({ method: 'DELETE' });
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
