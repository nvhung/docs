import Fastify from 'fastify';
import { documentRoutes } from './routes/document';
import { connectToDb } from './db';

const port = 8000;
const app = Fastify({
    logger: true
});

connectToDb();

app.register(require('@fastify/multipart'));
app.register(documentRoutes);

app.listen({port}, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.info(`Server started on port ${port}`);
    }
});