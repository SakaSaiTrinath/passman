"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth = require("./routes/auth");

var _auth2 = _interopRequireDefault(_auth);

var _docs = require("./routes/docs");

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

_mongoose2.default.set("useCreateIndex", true);

_mongoose2.default.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.use("/api/auth", _auth2.default);
app.use("/api/docs", _docs2.default);

/* app.post("/api/auth", (req, res) => {
	const { credentials } = req.body;
	res.status(400).json({
		errors: {
			global: "invalid credentials"
		}
	});
}); */

app.get("/*", function (req, res) {
	res.sendFile(_path2.default.join(__dirname, "index.html"));
});

app.listen(8080, function () {
	console.log("API is running on port 8080");
});