import * as fs from 'node:fs';
import * as path from "node:path";
import { mkdir, stat, readdir, unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import * as moment from 'moment';
import * as db from '../db';
import { equals, getDocumentDirectory, includes, without } from '../util';

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

export const updateDocumentDetail = async ({name, detail}) => {
    const doc = await getDocument({name});
    let details: any = doc.details;
    let changed = false;
    for (let i = 0; i < details.length; i++) {
        if (details[i].name === detail.name) {
            details[i].value = detail.value;
            changed = true;
        }
    }
    if (!changed) {
        details = [...details, detail];
    }
    await db.updateDocumentDetails({name, details});
};

export const removeDocumentDetail = async ({docName, detailName}) => {
    const doc = await getDocument({name: docName});
    let details: any = doc.details;
    let newDetails = [];
    let changed = false;
    for (let i = 0; i < details.length; i++) {
        if (details[i].name !== detailName) {
            newDetails = [...newDetails, details[i]]
            changed = true;
        }
    }
    changed && await db.updateDocumentDetails({name: docName, details: newDetails});
};

export const updateDocumentTags = async ({docName, tag, action}) => {
    const doc = await getDocument({name: docName});
    let tags: any = doc.tags;
    console.log(tags);
    if (action === 'add') {
        if (!includes(tag, tags)) {
            tags = [...tags, tag];
        }
    } else if (action === 'remove') {
        tags = without([tag], tags);
    }
    await db.updateDocumentTags({name: docName, tags});
};
