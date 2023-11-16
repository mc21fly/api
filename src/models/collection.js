const mongoose = require('mongoose');

const ContentsSchema = new mongoose.Schema(
	{
		type: { type: String, enum: ['snippet', 'template'], required: true },
		id: { type: String, required: true },
	},
	{ _id: false }
);

const CollectionSchema = new mongoose.Schema(
	{
		owner: { type: String, required: true },
		name: { type: String, required: true, minlength: 3, maxlength: 50, trim: true },
		contents: { type: [ContentsSchema], required: false },
	},
	{
		timestamps: true,
	}
);

const CollectionModel = mongoose.model('Collection', CollectionSchema);

module.exports = CollectionModel;
