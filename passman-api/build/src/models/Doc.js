"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
	dname: { type: String, required: true, index: true, unique: false },
	username: { type: String, default: "None" },
	email: { type: String, unique: false },
	password: { type: String, required: true },
	link: { type: String, default: "" },
	tags: { type: [String] },
	userId: { type: _mongoose2.default.Schema.Types.ObjectId, required: true }
});

schema.index({ dname: 1, email: 1 }, { unique: true });

exports.default = _mongoose2.default.model("Doc", schema);