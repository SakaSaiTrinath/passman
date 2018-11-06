import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import auth from "./routes/auth";
import docs from "./routes/docs";

dotenv.config();
const app = express();
app.use(bodyParser.json());

mongoose.set("useCreateIndex", true);

mongoose.connect(
	process.env.MONGODB_URL,
	{ useNewUrlParser: true }
);

app.use("/api/auth", auth);
app.use("/api/docs", docs);

const staticFiles = express.static(
	path.join(__dirname, "../../../passman-react/build")
);
app.use("/*", staticFiles);

/* app.post("/api/auth", (req, res) => {
	const { credentials } = req.body;
	res.status(400).json({
		errors: {
			global: "invalid credentials"
		}
	});
}); */

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
	console.log(`API listening on ${app.get("port")}`);
});
