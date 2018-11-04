import _ from "lodash";

export default function(errors) {
	const result = {};
	_.forEach(errors, (val, key) => {
		result[key] = val;
	});
	return result;
}
