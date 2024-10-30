import { createDocument, getDocument, updateDocumentFiles } from "../service";
import { post } from "../service/request";

export const mediateRequestDocument = async (id, setter) => {
    const document = await getDocument(id);
    setter(document);
};

export const mediateSubmitNewDocument = async (files, callback) => {
    const res = await createDocument(files);
    callback(res);
};

export const mediateSubmitDocumentFiles = async (name, files, callback) => {
    const res = await updateDocumentFiles({name, files});
    callback(res);
};
