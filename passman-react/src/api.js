import axios from "axios";

export default {
	user: {
		login: credentials =>
			axios.post("/api/auth", { credentials }).then(res => res.data.user)
	},
	docs: {
		fetchAll: () => axios.get("/api/docs").then(res => res.data.docs),
		addDoc: doc =>
			axios.post("/api/docs/add_doc", { doc }).then(res => res.data.doc),
		updateDoc: doc =>
			axios
				.post("/api/docs/update_doc", { doc })
				.then(res => res.data.doc),
		deleteDoc: id =>
			axios.post("/api/docs/delete_doc", { id }).then(res => res.data.id)
	}
};
