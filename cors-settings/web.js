const claudiaConfig = require('./claudia.json'),
	region = require('./package.json').config.awsRegion,
	url = `https://${claudiaConfig.api.id}.execute-api.${region}.amazonaws.com/latest`,
	sendFetchRequest = function (endpoint, content) {
		const headers = new Headers({
				'Content-Type': 'application/json'
			}),
			requestParams = {
				method: 'POST',
				headers: headers,
				mode: 'cors',
				body: JSON.stringify(content)
			};
		console.log('sending fetch request');
		return fetch(`${url}/${endpoint}`, requestParams).then(response => response.text());
	},
	sendXHRRequest = function (endpoint, content) {
		console.log('sending xhr request');
		return new Promise((resolve, reject) => {
			const oReq = new XMLHttpRequest();
			oReq.addEventListener('load', function () {
				resolve(this.responseText);
			});
			oReq.addEventListener('error', reject);
			oReq.addEventListener('abort', reject);
			oReq.open('POST', `${url}/${endpoint}`);
			oReq.setRequestHeader('Content-Type', 'application/json');
			oReq.send(JSON.stringify(content));
		});
	};

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#corsform').addEventListener('submit', e => {
		e.preventDefault();
		try {
			const form = e.target,
				inputFields = Array.from(form.querySelectorAll('input[type=text]')),
				resultField = form.querySelector('textarea'),
				requestTypeXhr = form.querySelector('input[type=radio][value=xhr]'),
				requestMethod = (requestTypeXhr.checked) ? sendXHRRequest: sendFetchRequest,
				content = {};
			inputFields.forEach(field => {
				content[field.getAttribute('name')] = field.value;
			});
			requestMethod('registrants', content)
				.then(respText => {
					resultField.value = respText || 'empty response';
				}).catch(e => {
					console.error('received error', e);
					resultField.value = e.message || e;
				});
		} catch (e) {
			console.error('error submitting request', e);
		}
	});
});


