const jwt = require('jsonwebtoken');

// Utils
const Response = require('../utils/Response');

function authorizeMiddleware(req, res, next) {
	// Destructure request
	const { headers } = req;
	const { authorization } = headers;

	// Chek if Authorization header exist
	if (!authorization) {
		return res.status(401).json(Response(401, 'Unathorized'));
	}

	// Split type from token
	const [scheme, parameters] = authorization.split(' ');

	// Check if Authorization header is type of 'Bearer'
	if (scheme !== 'Bearer') {
		return res.status(401).json(Response(401, 'Unathorized. Bearer scheme required'));
	}

	// Verify token
	jwt.verify(parameters, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			// Check if token expired
			if (err.name === 'TokenExpiredError') {
				return res.status(401).json(Response(401, 'Token expired', { exiredAt: err.expiredAt }));
			}

			return res.status(401).json(Response(401, 'Unathorized'));
		}
		res.locals.user = decoded;
		next();
	});
}

module.exports = authorizeMiddleware;
