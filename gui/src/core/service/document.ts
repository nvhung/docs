import { get } from "./request";

export const getDocument = async (id: any) => get(`/api/document/${id}`);
