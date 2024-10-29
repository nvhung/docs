import { getDocument } from "../service";

export const mediateRequestDocument = async (id, setter) => {
    const document = await getDocument(id);
    setter(document);
};

export const mediateSubmitNewDocument = async (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    await fetch('/api/document', {
        method: 'POST',
        body: formData/*,
        headers: {
            'Content-Type': 'multipart/form-data',
        }*/
    });
};

