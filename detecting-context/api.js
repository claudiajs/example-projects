exports.handler = function (event, context) {
	var alias = context.invokedFunctionArn.replace(/.*:/g,'');
	context.succeed('executing: ' + alias + ' (version ' + context.functionVersion + ')');
};
