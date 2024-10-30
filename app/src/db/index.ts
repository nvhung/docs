import mongoose from 'mongoose';

const documentNameSchema = new mongoose.Schema({
    date: {
        type: String
    },
    next: {
        type: Number
    }
});

const DocumentName = mongoose.model('DocumentName', documentNameSchema);

const documentFileSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    }
});

const documentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    files: [documentFileSchema]
});

const Document = mongoose.model('Document', documentSchema);

export const connectToDb = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to DB on ${process.env.DB_URL}`);
};

export const getDocumentName = async ({date}) => {
    const docName = await DocumentName.findOne();
    let name = `${date}-1`;
    if (docName.date === date) {
        name = `${date}-${docName.next}`;
        await DocumentName.updateOne({}, {$set: {next: docName.next + 1}});
    } else {
        await DocumentName.updateOne({}, {$set: {date, next: 1}});
    }
    return name;
};

export const insertDocument = ({name, files}) => {
    const doc = new Document({name, files});
    doc.save();
};

export const findDocument = async ({name}) => {
    return await Document.findOne({name});
};

export const updateDocumentFiles = async ({name, files}) => {
    const doc = await findDocument({name});
    await Document.updateOne({name}, {$set: {files}});
};
