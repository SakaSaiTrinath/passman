import axios from "axios";

export default function(token = null) {
	if (token) {
		axios.defaults.headers.common.authorization = `thanos ${token}`;
	} else {
		delete axios.defaults.headers.common.authorization;
	}
}
