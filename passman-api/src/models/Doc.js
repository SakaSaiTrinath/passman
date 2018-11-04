import mongoose from "mongoose";

const schema = new mongoose.Schema({
	dname: { type: String, required: true, index: true, unique: false },
	username: { type: String, default: "None" },
	email: { type: String, unique: false },
	password: { type: String, required: true },
	link: { type: String, default: "" },
	tags: { type: [String] },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

schema.index({ dname: 1, email: 1 }, { unique: true });

export default mongoose.model("Doc", schema);
