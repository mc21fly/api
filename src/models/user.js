const mongoose = require('mongoose');
const shajs = require('sha.js');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			maxlength: 12,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
			trim: true,
		},
		details: {
			name: {
				type: String,
				required: true,
				minlength: 2,
				maxlength: 24,
				trim: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre('save', async function () {
	// Hash password
	this.password = shajs('sha256').update(this.password).digest('hex');
});

UserSchema.pre('updateOne', async function () {
	// Hash password
	const { password } = this.getUpdate();
	if (password) {
		password = shajs('sha256').update(password).digest('hex');
	}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
