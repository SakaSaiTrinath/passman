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

app.listen(8080, () => {
	console.log("API is running on port 8080");
});
