import { schema } from "normalizr";

export const docSchema = new schema.Entity("docs", {}, { idAttribute: "_id" });
