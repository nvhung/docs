import { useEffect, useState } from "react";
import { Tags } from "./tags.component";
import { Details } from "./details.component";
import { mediateRequestDocument, mediateSubmitDocumentFiles, mediateSubmitNewDocument } from "../../core/mediator";
import { Files } from "./files.component";
import { useNavigate, useParams } from "react-router-dom";

const FileRenderer = (props: any) => {
    const file: any = props.file;
    return (
        <div className="d-inline-block me-2 border px-2 py-1 rounded-1 bg-success-subtle">
            <span>{file.name} ({file.size})</span>
        </div>
    );
};

export const Document = () => {
    const params = useParams();
    const navigate = useNavigate();
    const documentName = params.name;
    const [document, setDocument] = useState<any>();
    const [files, setFiles] = useState<any>([]);
    const [details, setDetails] = useState<any>([]);
    const [tags, setTags] = useState<any>([]);

    const handleMultipleChange = (event: any) => {
        setFiles([...event.target.files]);
    };

    const handleDetailsChange = (event: any) => {
        setDetails(event.target.value);
    };

    const handleTagsChange = (event: any) => {
        setTags(event.target.value);
    };

    const handleSubmitDocument = (event) => {
        mediateSubmitNewDocument(files, (res) => {});
    };

    const handleSelectFiles = (event) => {
        if (document) {
            mediateSubmitDocumentFiles(document.name, event.target.value, (res) => {
                if (res.success) {
                    mediateRequestDocument(documentName, setDocument);
                }
            });
        } else {
            mediateSubmitNewDocument(event.target.value, (res) => {
                if (res.success) {
                    navigate(`/document/${res.document.name}`);
                }
            });
        }
    };

    useEffect(() => {
        console.log(files);
        files.forEach((file: any) => {
            console.log(file.name, file.type);
        });
    }, [files]);

    useEffect(() => {
        documentName && mediateRequestDocument(documentName, setDocument);
    }, [documentName]);

    useEffect(() => {
        console.log('document', document);
    }, [document])

    return (
        <div>
            <div className="fw-bold fs-4 mb-3">{document ? documentName : 'New Document'}</div>
            <div className="fw-bold mb-3 border-bottom">Files</div>
            <Files className="ms-3 mb-3" document={document} onSelectFiles={handleSelectFiles} />
            <div className="fw-bold mb-3 border-bottom">Details</div>
            <Details className="ms-3 mb-3" details={details} onChange={handleDetailsChange} />
            <div className="fw-bold mb-3 border-bottom">Tags</div>
            <Tags className='ms-3 mb-3' tags={tags} onChange={handleTagsChange} />
        </div>
    );
};
