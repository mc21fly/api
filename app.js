require('dotenv').config();
require('./db');

const express = require('express');
const app = express();

// Utils
const Response = require('./src/utils/response');

// Routes
const routes = {
	register: require('./src/routes/register'),
	login: require('./src/routes/login'),
	logout: require('./src/routes/logout'),
	collections: require('./src/routes/collections'),
	templates: require('./src/routes/templates'),
	snippets: require('./src/routes/snippets'),
	users: require('./src/routes/users'),
};

// Middlewares
const middlewares = {
	authorizeToken: require('./src/middlewares/authorizeToken'),
};

app.use(express.json());

// Define routes with middleware
app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/logout', middlewares.authorizeToken, routes.logout);
app.use('/collections', middlewares.authorizeToken, routes.collections);
app.use('/templates', middlewares.authorizeToken, routes.templates);
app.use('/snippets', middlewares.authorizeToken, routes.snippets);
app.use('/users', middlewares.authorizeToken, routes.users);

app.all('/*', (req, res) => {
	res.status(404).json(Response(404, 'Route not found', null, 999999));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(PORT);
});
