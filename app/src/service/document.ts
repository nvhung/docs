import * as fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import * as moment from 'moment';
import { getDocumentName, insertDocument } from '../db';

const getDocumentDirectory = (docName) => `${process.env.DATA_DIR}/${docName.replace(/[\.\-]/g,'/')}`;

export const createDocument = async (files) => {
    const date = moment().format('YYYY.MM.DD');
    const name = await getDocumentName({date});
    const directory = getDocumentDirectory(name);
    await mkdir(directory, {recursive: true});
    let filenames = [];
    for await (const file of files) {
        await pipeline(file.file, fs.createWriteStream(`${directory}/${file.filename}`));
        filenames = [...filenames, file.filename];
    }
    insertDocument({name, files: filenames});
    return name;
};
