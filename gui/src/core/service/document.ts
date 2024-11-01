import { del, get, post, put } from "./request";

export const getDocument = async (id: any) => get(`/api/document/${id}`);

export const createDocument = (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    return post('/api/document', formData);
}

export const updateDocumentFiles = ({name, files}) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    return put(`/api/document/${name}/files`, formData);
};

export const submitDocumentDetail = ({name, detail}) => {
    return put(`/api/document/${name}/detail`, detail);
};

export const removeDocumentDetail = ({docName, detailName}) => {
    return del(`/api/document/${docName}/detail/${detailName}`);
};

export const updateDocumentTags = ({docName, tag, action}) => {
    return post(`/api/document/${docName}/tags`, {docName, tag, action});
};
