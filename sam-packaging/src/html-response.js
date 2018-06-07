module.exports = (body, statusCode) => {
    return {
        statusCode: (statusCode || 200),
        body: body,
		headers: {
			'Content-Type': 'text/html'
		}
    };
};

