"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

var BOT_NAMES = ["kamrmabot", "karmapolice", "karmathot", "karmachameleon", "kakarot"];

var SlackService = (function () {
	function SlackService(configService, config) {
		_classCallCheck(this, SlackService);

		this._configService = configService;
		this._config = config;
	}

	//Parse json data

	_createClass(SlackService, [{
		key: "parseJson",
		value: function parseJson(str) {

			return new Promise(function (res, rej) {

				try {
					str = str.replace(/\\"/g, '');
					res(JSON.parse(str));
				} catch (e) {
					rej();
				}
			});
		}

		//Authenticate request

	}, {
		key: "authenticate",
		value: function authenticate(teamId, token) {
			var _this = this;

			return new Promise(function (res, rej) {

				_this._configService.getConfig(teamId).then(function (data) {

					if (!data) {
						rej("No config found.");
					}

					if (token !== data.outgoingToken) {
						rej("Invalid token.");
					}

					res();
				})["catch"](function (err) {

					rej(err);
				});
			});
		}

		//Send slack response

	}, {
		key: "sendResponse",
		value: function sendResponse(slackData, message, res) {
			var _this2 = this;

			if (!message) {
				message = "Invalid Command. For help see; " + slackData.triggerWord + ": ?";
			}

			if (this._config.productionEnv) {
				(function () {

					var slackRes = new _slackNode2["default"]();

					_this2._configService.getConfig(slackData.teamId).then(function (data) {

						//data.incomingWebhookUrl = "https://hooks.slack.com/services/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";

						if (data.incomingWebhookUrl) {

							slackRes.setWebhook(data.incomingWebhookUrl);

							slackRes.webhook({

								channel: "#" + slackData.channelName,
								username: BOT_NAMES[Math.foor(Math.random() * BOT_NAMES.length)],
								text: message
							}, function (err, response) {

								console.log(response);
							});
						}
					});
				})();
			} else {
				res.send(message.toString());
				return;
			}
		}
	}]);

	return SlackService;
})();

exports["default"] = SlackService;
module.exports = exports["default"];
//# sourceMappingURL=slack.service.js.map
