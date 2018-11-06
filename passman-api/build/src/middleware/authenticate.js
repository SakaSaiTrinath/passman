"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
	var header = req.headers.authorization;
	var token = void 0;

	if (header) token = header.split(" ")[1];

	if (token) {
		_jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
			if (err) {
				res.status(401).json({
					errors: { global: "Unauthorized user..." }
				});
			} else {
				_User2.default.findOne({ username: decoded.username }).then(function (user) {
					req.currentUser = user;
					next();
				});
			}
		});
	} else {
		res.status(400).json({ errors: { global: "Unauthorized user" } });
	}
};