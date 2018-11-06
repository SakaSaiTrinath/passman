"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
	username: {
		type: String,
		required: true,
		lowercase: true,
		index: true,
		unique: true
	},
	passwordHash: { type: String, required: true }
});

schema.methods.generateJWT = function generateJWT() {
	return _jsonwebtoken2.default.sign({
		username: this.username
	}, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		username: this.username,
		token: this.generateJWT()
	};
};

schema.methods.isValidPassword = function isValidPassword(password) {
	return _bcrypt2.default.compareSync(password, this.passwordHash);
};

exports.default = _mongoose2.default.model("User", schema);