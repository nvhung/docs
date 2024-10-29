import { createDocument } from "../service";

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
    app.get('/api/document/:id', {}, (request, reply) => {
        console.log(`get document ${request.params.id}`);
        reply.send({
            id: request.params.id
        });
    });
};
