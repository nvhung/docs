import { useRef } from "react";
import { formatBytes } from "../common/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mediateRequestDocument, mediateSubmitDocumentFiles, mediateSubmitNewDocument } from "../../core/mediator";

const FileRenderer = ({docName, file}) => {
    return (
        <a href={`/api/document/${docName}/${file.name}`} rel="noreferrer" target='_blank'>{file.name} ({formatBytes(file.size)})</a>
    );
};

export const Files = ({document, className = ''}) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const fileRef = useRef<any>();

    const handleFilesChange = (event: any) => {
        const files = [...event.target.files];
        if (document && document.name) {
            dispatch(mediateSubmitDocumentFiles(document.name, files, (res) => {
                if (res.success) {
                    dispatch(mediateRequestDocument(document.name));
                }
            }));
        } else {
            dispatch(mediateSubmitNewDocument(document.name, files, (res) => {
                if (res.success) {
                    navigate(`/document/${res.document.name}`);
                }
            }));
        }
    };

    const handleClickChooseAndUploadFiles = (event) => {
        fileRef.current.click();
    };

    return (
        <div className={className}>
            <button 
                type='button' 
                className='btn btn-secondary me-3'
                onClick={handleClickChooseAndUploadFiles}
            >Choose and upload files</button>
            <form className="d-none">
                <input type="file" ref={fileRef} className="form-control mb-2 me-2" multiple onChange={handleFilesChange} />
            </form>
            {document && document.files && document.files.map((e, index) => <FileRenderer key={`file-${index}`} docName={document.name} file={e} />)}
        </div>
    );
};
