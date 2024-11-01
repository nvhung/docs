import { 
    createDocument, 
    getDocument, 
    removeDocumentDetail, 
    submitDocumentDetail, 
    updateDocumentFiles 
} from "../service";
import { createUpdateDocumentAction } from "../store/document.state";

export const mediateRequestDocument = (name) => async (dispatch) => {
    const document = await getDocument(name);
    document && dispatch(createUpdateDocumentAction(document));
};

export const mediateSubmitNewDocument = (name, files, callback) => async (dispatch) => {
    const res = await createDocument(files);
    res && res.success && callback(res);
};

export const mediateSubmitDocumentFiles = (name, files, callback) => async (dispatch) => {
    const res = await updateDocumentFiles({name, files});
    res && res.success && callback(res);
};

export const mediateSubmitDocumentDetail = (name, detail, callback) => async (dispatch) => {
    const res = await submitDocumentDetail({name, detail});
    res && res.success && callback(res);
};

export const mediateRemoveDocumentDetail = (docName, detailName, callback) => async (dispatch) => {
    const res = await removeDocumentDetail({docName, detailName});
    res && res.success && callback(res);
};