import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
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
	return jwt.sign(
		{
			username: this.username
		},
		process.env.JWT_SECRET
	);
};

schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		username: this.username,
		token: this.generateJWT()
	};
};

schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

export default mongoose.model("User", schema);
