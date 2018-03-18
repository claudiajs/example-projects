/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const claudiaConfig = __webpack_require__(1),
	region = __webpack_require__(2).config.awsRegion,
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




/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"lambda":{"role":"testcors3-executor","name":"testcors3","region":"us-east-1"},"api":{"id":"n5yfm78d9b","module":"api"}}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"test-cors","version":"1.0.0","scripts":{"create":"claudia create --api-module api --region $npm_package_config_awsRegion","update":"claudia update","serve":"webpack && http-server -c-1","destroy":"claudia destroy"},"config":{"awsRegion":"us-east-1"},"files":["api.js"],"devDependencies":{"claudia":"^3.3.1","http-server":"^0.11.1","webpack":"^3.10.0"},"dependencies":{"claudia-api-builder":"^3.0.2"}}

/***/ })
/******/ ]);