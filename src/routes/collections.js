const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

// Utils
const Response = require('../utils/response');

// Models
const CollectionModel = require('../models/collection');

route.get('/', async (req, res) => {
	try {
		const foundCollection = await CollectionModel.find({ owner: req.user.id });
		res.status(200).json(Response(200, 'Collection found', foundCollection));
	} catch (err) {
		res.status(400).json(Response(400, 'Collection error'));
	}
});

route.post('/', async (req, res) => {
	const newCollection = new CollectionModel({
		owner: req.user.id ? req.user.id : null,
		name: req.body.name ? req.body.name : null,
		contents: req.body.contents ? req.body.contents : [],
	});

	try {
		const savedCollection = await newCollection.save();
		res.status(201).json(savedCollection);
	} catch (err) {
		res.status(400).json(Response(400, 'Collection not created'));
	}
});

route.put('/', async (req, res) => {
	try {
		await CollectionModel.findOneAndUpdate(
			{ _id: new mongoose.Types.ObjectId(req.body.id), owner: req.user.id },
			req.body.collection
		);

		const updatedCollection = await CollectionModel.findOne({
			_id: new mongoose.Types.ObjectId(req.body.id),
			owner: req.user.id,
		});
		res.status(200).json(Response(200, 'Collection updated', updatedCollection));
	} catch (err) {
		console.log(err);
		res.status(400).json(Response(400, 'Collection update error'));
	}
});

route.delete('/', (req, res) => {
	res.status(200).json(Response(200, 'Delete'));
});

route.all('/', (req, res) => {
	res.status(405).json(Response(405, `${req.method} Method not allowed`));
});

module.exports = route;
