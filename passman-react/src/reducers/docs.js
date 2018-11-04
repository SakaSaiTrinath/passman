import {
	DOCS_FETCHED,
	DOC_CREATED,
	DOC_UPDATED,
	DOC_DELETED,
	DOCS_CLEARED
} from "../types";
import { createSelector } from "reselect";

export default function docs(state = {}, action = {}) {
	switch (action.type) {
		case DOCS_FETCHED:
		case DOC_CREATED:
		case DOC_UPDATED:
			return { ...state, ...action.data.entities.docs };
		case DOC_DELETED:
			return state;
		case DOCS_CLEARED:
			return {};
		default:
			return state;
	}
}

// SELECTORS

export const docsSelector = state => state.docs;

export const allDocsSelector = createSelector(docsSelector, docHash =>
	Object.values(docHash)
);
