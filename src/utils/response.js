function Response(status, message, payload, code) {
	return {
		status,
		code,
		message,
		payload: payload ? payload : undefined,
	};
}

module.exports = Response;
