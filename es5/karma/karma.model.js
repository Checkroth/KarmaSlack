'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseClassWrapper = require('mongoose-class-wrapper');

var _mongooseClassWrapper2 = _interopRequireDefault(_mongooseClassWrapper);

var karmaSchema = _mongoose2['default'].Schema({
	teamId: String,
	userId: String,
	karmaPoints: Number
});

var KarmaModel = (function () {
	function KarmaModel() {
		_classCallCheck(this, KarmaModel);
	}

	_createClass(KarmaModel, null, [{
		key: 'changeOrCreate',
		value: function changeOrCreate(teamId, userId, amnt) {
			var _this = this;

			return this.findOne({ teamId: teamId, userId: userId }, function (err, user) {
				if (user) {
					user.karmaPoints = user.karmaPoints + amnt;
					return user.save(function (err) {
						if (err) console.err('Couldn\'t add karma to ' + userId);
					});
				} else {
					return _this.create({
						"teamId": teamId,
						"userId": userId,
						"karmaPoints": amnt
					}, function (err, usr) {
						if (err) console.err('Couldn\'t create user ' + userId + ' with points ' + amnt);
					});
				}
			});
		}
	}, {
		key: 'getUserPoints',
		value: function getUserPoints(teamId, userId) {
			return this.findOne({ teamId: teamId, userId: userId });
		}
	}, {
		key: 'getTeamPoints',
		value: function getTeamPoints(teamId) {
			var _this2 = this;

			return new Promise(function (res, rej) {
				_this2.find({ teamId: teamId }, {
					sort: {
						karmaPoints: -1
					}
				}, function (err, users) {
					if (err) {
						console.err('Couldn\'t find users for ' + teamId);
					}
					res(users);
				});
			});
		}
	}]);

	return KarmaModel;
})();

karmaSchema.plugin(_mongooseClassWrapper2['default'], KarmaModel);

exports['default'] = _mongoose2['default'].model('Karma', karmaSchema);
module.exports = exports['default'];
//# sourceMappingURL=karma.model.js.map
