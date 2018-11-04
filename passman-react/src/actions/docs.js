import { normalize } from "normalizr";
import api from "../api";
import {
	DOCS_FETCHED,
	DOC_CREATED,
	DOC_UPDATED,
	DOC_DELETED,
	DOCS_CLEARED
} from "../types";
import { docSchema } from "../schemas";

export const docsFetched = data => ({
	type: DOCS_FETCHED,
	data
});

export const docCreated = data => ({
	type: DOC_CREATED,
	data
});

export const docUpdated = data => ({
	type: DOC_UPDATED,
	data
});

export const docDeleted = data => ({
	type: DOC_DELETED,
	data
});

export const docsClered = () => ({
	type: DOCS_CLEARED
});

export const fetchDocs = () => dispatch =>
	api.docs
		.fetchAll()
		.then(docs => dispatch(docsFetched(normalize(docs, [docSchema]))));

export const addDoc = doc => dispatch =>
	api.docs
		.addDoc(doc)
		.then(doc => dispatch(docCreated(normalize(doc, docSchema))));

export const updateDoc = doc => dispatch =>
	api.docs
		.updateDoc(doc)
		.then(doc => dispatch(docUpdated(normalize(doc, docSchema))));

export const deleteDoc = id => dispatch =>
	api.docs.deleteDoc(id).then(id => dispatch(docDeleted(id)));
