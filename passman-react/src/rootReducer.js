import { combineReducers } from "redux";

import user from "./reducers/user";
import docs from "./reducers/docs";

export default combineReducers({
	user,
	docs
});
