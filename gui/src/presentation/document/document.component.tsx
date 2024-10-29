import { useEffect, useState } from "react";
import { Tags } from "./tags.component";
import { Details } from "./details.component";
import { mediateRequestDocument, mediateSubmitNewDocument } from "../../core/mediator";

const FileRenderer = (props: any) => {
    const file: any = props.file;
    return (
        <div className="d-inline-block me-2 border px-2 py-1 rounded-1 bg-success-subtle">
            <span>{file.name} ({file.size})</span>
        </div>
    );
};

export const Document = () => {
    const [document, setDocument] = useState();
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
        mediateSubmitNewDocument(files);
    };

    useEffect(() => {
        console.log(files);
        files.forEach((file: any) => {
            console.log(file.name, file.type);
        });
    }, [files]);

    useEffect(() => {
        mediateRequestDocument(1, setDocument);
    }, []);

    useEffect(() => {
        console.log('document', document);
    }, [document])

    return (
        <div>
            <div className="fw-bold mb-3 border-bottom">Files</div>
            <div className="ms-3 mb-3">
                <form>
                    <input type="file" className="form-control mb-2 me-2" multiple onChange={handleMultipleChange} />
                    <div>
                        {files && files.map((e, index) => <FileRenderer key={`file-${index}`} file={e} />)}
                        <button 
                            type="button" 
                            className={`btn btn-primary ${files.length > 0 ? '' : 'd-none'}`}
                            onClick={handleSubmitDocument}
                        >Submit</button>
                    </div>
                </form>
            </div>
            <div className="fw-bold mb-3 border-bottom">Details</div>
            <Details className="ms-3 mb-3" details={details} onChange={handleDetailsChange} />
            <div className="fw-bold mb-3 border-bottom">Tags</div>
            <Tags className='ms-3 mb-3' tags={tags} onChange={handleTagsChange} />
        </div>
    );
};
