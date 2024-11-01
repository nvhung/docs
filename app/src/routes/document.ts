import { encode } from 'urlencode';
import { createDocument, getDocument, removeDocumentDetail, updateDocumentDetail, updateDocumentFiles } from "../service";
import { getDocumentDirectory } from '../util';

export const documentRoutes = (app, options) => {
    app.post('/api/document', {}, async (request, reply) => {
        const files = request.files();
        const docName = await createDocument(files);
        reply.send({
            document: {
                name: docName
            },
            success: true
        });
    });

    app.put('/api/document/:name/files', {}, async (request, reply) => {
        console.log(`update files for document ${request.params.name}`);
        const files = request.files();
        await updateDocumentFiles({name: request.params.name, files});
        reply.send({ success: true });
    });

    app.get('/api/document/:name', {}, async (request, reply) => {
        console.log(`get document ${request.params.name}`);
        const doc = await getDocument({name: request.params.name});
        reply.send({
            name: doc.name,
            files: doc.files.map((e) => ({
                name: e.name,
                mimetype: e.mimetype,
                size: e.size,
                url: `/api/document/${doc.name}/${encode(e.name)}`
            })),
            details: (doc.details || []).map((e) => ({
                name: e.name,
                type: e.type,
                value: e.value
            }))
        });
    });

    app.get('/api/document/:name/:file', {}, async (request, reply) => {
        const docName = request.params.name;
        const fileName = request.params.file;
        console.log(`get document file ${docName}/${fileName}`);
        const doc = await getDocument({name: docName});
        const docDir = getDocumentDirectory(docName);
        const filePath = `${docDir}/${fileName}`;
        return reply.sendFile(filePath);
    });

    app.put('/api/document/:name/detail', {}, async (request, reply) => {
        const docName = request.params.name;
        console.log(`Update document ${docName} detail ${JSON.stringify(request.body)}`);
        updateDocumentDetail({
            name: docName,
            detail: request.body
        });
        reply.send({
            success: true
        });
    });

    app.delete('/api/document/:name/detail/:detail', {}, async (request, reply) => {
        const docName = request.params.name;
        const detailName = request.params.detail;
        console.log(`Remove document ${docName} detail ${detailName}`);
        removeDocumentDetail({
            docName,
            detailName
        });
        reply.send({
            success: true
        });
    });
};
