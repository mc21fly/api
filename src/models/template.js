const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema(
	{
		owner: { type: String, required: true },
		name: { type: String, required: true, minlength: 3, maxlength: 50, trim: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const TemplateModel = mongoose.model('Template', TemplateSchema);

module.exports = TemplateModel;
