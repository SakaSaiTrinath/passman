import jwt from "jsonwebtoken";
import User from "../models/User";

export default (req, res, next) => {
	const header = req.headers.authorization;
	let token;

	if (header) token = header.split(" ")[1];

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({
					errors: { global: "Unauthorized user..." }
				});
			} else {
				User.findOne({ username: decoded.username }).then(user => {
					req.currentUser = user;
					next();
				});
			}
		});
	} else {
		res.status(400).json({ errors: { global: "Unauthorized user" } });
	}
};
