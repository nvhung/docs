import * as fs from 'node:fs';
import * as path from "node:path";
import { mkdir, stat, readdir, unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import * as moment from 'moment';
import * as db from '../db';
import { getDocumentDirectory } from '../util';

export const createDocument = async (files) => {
    const date = moment().format('YYYY.MM.DD');
    const name = await db.getDocumentName({date});
    const directory = process.env.DATA_DIR + getDocumentDirectory(name);
    await mkdir(directory, {recursive: true});
    let fileInfos = [];
    for await (const file of files) {
        await pipeline(file.file, fs.createWriteStream(`${directory}/${file.filename}`));
        const fileStat = await stat(`${directory}/${file.filename}`);
        fileInfos = [...fileInfos, {name: file.filename, mimetype: file.mimetype, size: fileStat.size}];
    }
    await db.insertDocument({name, files: fileInfos});
    return name;
};

const deleteAllFiles = async (dir) => {
    for (const file of await readdir(dir)) {
        await unlink(path.join(dir, file));
    }
};

export const updateDocumentFiles = async ({name, files}) => {
    const directory = process.env.DATA_DIR + getDocumentDirectory(name);
    deleteAllFiles(directory);
    let fileInfos = [];
    for await (const file of files) {
        await pipeline(file.file, fs.createWriteStream(`${directory}/${file.filename}`));
        const fileStat = await stat(`${directory}/${file.filename}`);
        fileInfos = [...fileInfos, {name: file.filename, mimetype: file.mimetype, size: fileStat.size}];
    }
    await db.updateDocumentFiles({name, files: fileInfos});
};

export const getDocument = async ({name}) => {
    return await db.findDocument({name});
};
