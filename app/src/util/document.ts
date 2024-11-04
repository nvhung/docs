import { map, pipe, find, propEq, prop } from "./ramda.util";

export const getDocumentDirectory = (docName) => `/${docName.replace(/[\.\-]/g,'/')}`;

export const getDbDocumentQuery = (query) => {
    return {};
};

const getDocumentDetail = (doc, detail) => pipe(
    (e) => { console.log(e); return e;},
    find<any>(propEq(detail, 'name')),
    (e) => { console.log(e); return e;},
    prop('value')
)(doc.details || []);

export const getDocumentSearchResult = map((e: any) => ({
    name: e.name,
    title: getDocumentDetail(e, 'title') || e.name
}));