/*eslint "strict": ["global"] */
'use strict';
const aws = require('aws-sdk'),
	region = 'us-east-1',
	iot = new aws.Iot({region: region}),
	postToEndpoint = function (endpoint, topic, message) {
		console.log('posting to', endpoint, topic, message);
		const iotdata = new aws.IotData({region: region, endpoint: endpoint});
		return iotdata.publish({ topic: topic, payload: message }).promise();
	},
	postToDefaultEndpoint = function (topic, message) {
		return iot.describeEndpoint().promise()
			.then(data => postToEndpoint(data.endpointAddress, topic, message));
	};

postToDefaultEndpoint('test/999', JSON.stringify({message: 'from the script'}))
.then(() => console.log('posted successfully'))
.catch(e => console.log('error posting', e));


