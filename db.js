const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.p6bdk5v.mongodb.net/?retryWrites=true&w=majority&dbName=emailstudio`;

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB: ' + err);
	});

module.exports = mongoose.connection;
