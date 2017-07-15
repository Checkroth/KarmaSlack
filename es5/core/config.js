'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Config = (function () {
	function Config() {
		_classCallCheck(this, Config);

		this._env = process.env.NODE_ENV || 'development';
		this._port = process.env.PORT || 80;
		this._mongodbName = process.env.MONGODB_NAME || 'karmatest';
		this._mongodbUsername = process.env.MONGODB_USERNAME || 'trunk';
		this._mongodbPassword = process.env.MONGODB_PASSWORD || 'trunk';
		this._mongodbEndpoint = process.env.MONGODB_ENDPOINT || 'localhost';
		this._mongodbPort = process.env.MONGODB_PORT || '25762';
	}

	_createClass(Config, [{
		key: 'db',
		get: function get() {
			return this.productionEnv ? 'mongodb://' + this._mongodbUsername + ':' + this._mongodbPassword + '@' + this._mongodbEndpoint + ':' + this.__mongodbPort + '/' + this._mongodbName : 'mongodb://localhost/karma';
		}
	}, {
		key: 'port',
		get: function get() {
			return this.productionEnv ? this._port : '3000';
		}
	}, {
		key: 'productionEnv',
		get: function get() {
			return this._env === 'production';
		}
	}]);

	return Config;
})();

exports['default'] = Config;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map
