import express from "express";
import authenticate from "../middleware/authenticate";
import Doc from "../models/Doc";
import parseErrors from "../utils/parseErrors";

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
	Doc.find({ userId: req.currentUser._id }).then(docs => {
		res.json({ docs });
	});
});

router.post("/add_doc", (req, res) => {
	const newDoc = new Doc({ ...req.body.doc, userId: req.currentUser._id });
	newDoc
		.save()
		.then(doc => {
			res.json({ doc });
		})
		.catch(err => {
			let p_errors = parseErrors(err);
			res.status(400).json({ errors: { global: p_errors.errmsg } });
		});
});

router.post("/update_doc", (req, res) => {
	const { dname, email } = req.body.doc;
	const uid = req.currentUser._id;
	Doc.findOneAndUpdate(
		{ dname: dname, email: email, userId: uid },
		{ ...req.body.doc, userId: req.currentUser._id },
		{}
	).then(doc => (doc ? res.json({ doc }) : res.status(400).json({})));
});

router.post("/delete_doc", (req, res) => {
	const { id } = req.body;
	Doc.find({ _id: id, userId: req.currentUser._id }).deleteOne(() => {
		res.json({ id });
	});
});

export default router;
