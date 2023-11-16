const mongoose = require('mongoose');

const mongoURI = `${process.env.DB_URI}`;

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB: ' + err);
	});

module.exports = mongoose.connection;
