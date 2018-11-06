"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _authenticate = require("../middleware/authenticate");

var _authenticate2 = _interopRequireDefault(_authenticate);

var _Doc = require("../models/Doc");

var _Doc2 = _interopRequireDefault(_Doc);

var _parseErrors = require("../utils/parseErrors");

var _parseErrors2 = _interopRequireDefault(_parseErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var router = _express2.default.Router();
router.use(_authenticate2.default);

router.get("/", function (req, res) {
	_Doc2.default.find({ userId: req.currentUser._id }).then(function (docs) {
		res.json({ docs: docs });
	});
});

router.post("/add_doc", function (req, res) {
	var tags = Object.values(req.body.doc.tags); //converting object values into array
	tags.join("").split(""); //Removing blank spaces in the array of text elements
	var newDoc = new _Doc2.default(_extends({}, req.body.doc, {
		tags: tags,
		userId: req.currentUser._id
	}));
	newDoc.save().then(function (doc) {
		res.json({ doc: doc });
	}).catch(function (err) {
		var p_errors = (0, _parseErrors2.default)(err);
		res.status(400).json({ errors: { global: p_errors.errmsg } });
	});
});

router.post("/update_doc", function (req, res) {
	var _req$body$doc = req.body.doc,
	    dname = _req$body$doc.dname,
	    email = _req$body$doc.email;

	var uid = req.currentUser._id;
	var tags = Object.values(req.body.doc.tags); //converting object values into array
	tags.join("").split(""); //Removing blank spaces in the array of text elements
	_Doc2.default.findOneAndUpdate({ dname: dname, email: email, userId: uid }, _extends({}, req.body.doc, {
		tags: tags,
		userId: req.currentUser._id
	}), {}).then(function (doc) {
		return doc ? res.json({ doc: doc }) : res.status(400).json({});
	});
});

router.post("/unique_tags", function (req, res) {
	var uniqueTags = [];

	_Doc2.default.find({ userId: req.currentUser._id }).then(function (docs) {
		//console.log(docs);
		docs.map(function (doc) {
			uniqueTags.concat(doc.tags);
			uniqueTags = [].concat(_toConsumableArray(uniqueTags), _toConsumableArray(doc.tags));

			uniqueTags = uniqueTags.filter(function (el, index, self) {
				return index === self.indexOf(el) && el !== "";
			});
		});
		var tags = uniqueTags;
		res.json({ tags: tags });
	});
});

router.post("/delete_doc", function (req, res) {
	var id = req.body.id;

	_Doc2.default.find({ _id: id, userId: req.currentUser._id }).deleteOne(function () {
		res.json({ id: id });
	});
});

exports.default = router;