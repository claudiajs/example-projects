(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("express"), require("http-proxy-middleware"), require("path"), require("prop-types"), require("react-context-component"), require("react-dom/server"), require("react-router"), require("react-router-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "express", "http-proxy-middleware", "path", "prop-types", "react-context-component", "react-dom/server", "react-router", "react-router-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("express"), require("http-proxy-middleware"), require("path"), require("prop-types"), require("react-context-component"), require("react-dom/server"), require("react-router"), require("react-router-dom")) : factory(root["react"], root["express"], root["http-proxy-middleware"], root["path"], root["prop-types"], root["react-context-component"], root["react-dom/server"], root["react-router"], root["react-router-dom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_context_component__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_context_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_context_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_App__ = __webpack_require__(7);
var _jsxFileName = '/Users/dempser/code/universal-create-react-app/src/server/app.js',
    _this = this;








var ErrorPage = function ErrorPage() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h1',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: _this
    },
    'Oops there was an error'
  );
};

var reactApp = function reactApp(req, res) {
  var context = {};
  var HTML = void 0;
  var status = 200;

  var setStatus = function setStatus(newStatus) {
    status = newStatus;
  };

  try {
    HTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__render__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_context_component___default.a,
      { setStatus: setStatus, __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router__["StaticRouter"],
        { context: {}, location: req.url, __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__shared_App__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: _this
        })
      )
    ));
  } catch (error) {
    HTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__render__["a" /* default */])(ErrorPage);
    status = 500;
  }

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.status(status).send(HTML);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (reactApp);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http-proxy-middleware");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverPort", function() { return serverPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app__ = __webpack_require__(1);






var host = "localhost" || 'localhost';
var serverPort =  true ? "5678" : process.env.REACT_APP_PORT || 80;

var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

if (false) {
  // In production we want to serve our JavaScripts from a file on the file
  // system.
  app.use('/static', express.static(path.join(process.cwd(), 'build/client/static')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(['/static', '/sockjs-node'], __WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware___default()({
    target: 'http://localhost:' + "3000",
    ws: true,
    logLevel: 'error'
  }));
}

app.use('/', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static('build/client'));

app.use(__WEBPACK_IMPORTED_MODULE_3__app__["a" /* default */]

// We need to uncomment this because aws-serverless-express handles listening.
// for dev, run localServer.js
// app.listen(serverPort)
// console.log(`Listening at http://${host}:${serverPort}`)
);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_dom_server__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_dom_server__);


var DEV = "development" === 'development';
var assetManifest = JSON.parse(__webpack_require__.i({"NODE_ENV":"development","PUBLIC_URL":"","REACT_APP_HOST":"localhost","REACT_APP_PORT":"8080","REACT_APP_CLIENT_PORT":"3000"}).REACT_APP_ASSET_MANIFEST || '{}');
var bundleUrl = DEV ? '/static/js/bundle.js' : '/' + assetManifest['main.js'];
var css = DEV ? '' : // in DEV the css is hot loaded
'<link href="/' + assetManifest['main.css'] + '" media="all" rel="stylesheet" />';

/* harmony default export */ __webpack_exports__["a"] = (function (component) {
  return '\n  <!DOCTYPE html>\n    <html lang="en">\n      <head>\n        <meta charset="utf-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n        <meta name="theme-color" content="#000000">\n        ' + css + '\n        <link rel="manifest" href="/public/manifest.json">\n        <link rel="shortcut icon" href="/public/favicon.ico">\n        <title>React App</title>\n      </head>\n      <body>\n        <div id="root">' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_dom_server__["renderToString"])(component) + '</div>\n        <script type="application/javascript" src="' + bundleUrl + '"></script>\n      </body>\n  </html>\n';
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PageNotFound */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logo_svg__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logo_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__logo_svg__);
var _jsxFileName = '/Users/dempser/code/universal-create-react-app/src/shared/App.js',
    _this = this;








var Header = function Header() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'App-header', __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_3__logo_svg___default.a, className: 'App-logo', alt: 'logo', __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: _this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h2',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: _this
      },
      'Welcome to Universal React'
    )
  );
};

var PageNotFound = function PageNotFound(props) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (context.setStatus) {
    context.setStatus(404);
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: _this
      },
      'Page not found'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
      { to: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: _this
      },
      'Go home'
    )
  );
};
PageNotFound.contextTypes = {
  setStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

var TestRouterPage = function TestRouterPage(_ref) {
  var match = _ref.match;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'App-intro', __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: _this
      },
      'Test page ',
      match.params.id
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
        { to: '/', __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: _this
        },
        'Home'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
        { to: '/aljlskaklksdkfaj falsflasd', __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          },
          __self: _this
        },
        'Go to non-existent page'
      )
    )
  );
};

var Home = function Home() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'App-intro', __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: _this
      },
      'To get started, edit ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'code',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          },
          __self: _this
        },
        'src/shared/App.js'
      ),
      ' and save to reload.'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
      { to: '/test/123', __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: _this
      },
      'Test the router'
    )
  );
};

var App = function App() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'App', __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Route"], { path: '/', component: function component(_ref2) {
        var match = _ref2.match;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 69
            },
            __self: _this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Header, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            },
            __self: _this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Switch"],
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              },
              __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Route"], { exact: true, path: '/', component: Home, __source: {
                fileName: _jsxFileName,
                lineNumber: 72
              },
              __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Route"], { exact: true, path: '/test/:id', component: TestRouterPage, __source: {
                fileName: _jsxFileName,
                lineNumber: 73
              },
              __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Route"], { component: PageNotFound, __source: {
                fileName: _jsxFileName,
                lineNumber: 74
              },
              __self: _this
            })
          )
        );
      }, __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: _this
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/logo.5d5d9eef.svg";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-context-component");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map