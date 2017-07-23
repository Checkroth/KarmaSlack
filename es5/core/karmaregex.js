"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KarmaRegex = (function () {
	function KarmaRegex() {
		_classCallCheck(this, KarmaRegex);
	}

	_createClass(KarmaRegex, [{
		key: "helpPattern",
		get: function get() {
			return (/(\?)/
			);
		}
	}, {
		key: "initPattern",
		get: function get() {
			return (/((init \{)([\s\S]*)(\}))/
			);
		}
	}, {
		key: "userIdPattern",
		get: function get() {
			return (/<@(.*?)>/
			);
		}
	}, {
		key: "anyIdPattern",
		get: function get() {
			return (/@(.*?)>? /
			);
		}
	}, {
		key: "userIdSinglePattern",
		get: function get() {
			return (/^<@(.*?)>$/
			);
		}
	}, {
		key: "teamIdPattern",
		get: function get() {
			return (/<!everyone>/
			);
		}
	}, {
		key: "posPattern",
		get: function get() {
			return (/((<@)(.*)(> ?)(\+\+))/
			);
		}
	}, {
		key: "negPattern",
		get: function get() {
			return (/((<@)(.*)(> ?)(\-\-))/
			);
		}
	}]);

	return KarmaRegex;
})();

exports["default"] = new KarmaRegex();
module.exports = exports["default"];
//# sourceMappingURL=karmaregex.js.map
