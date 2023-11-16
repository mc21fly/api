const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema(
	{
		owner: { type: String, required: true },
		name: { type: String, required: true, minlength: 3, maxlength: 50, trim: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const SnippetModel = mongoose.model('Snippet', SnippetSchema);

module.exports = SnippetModel;
