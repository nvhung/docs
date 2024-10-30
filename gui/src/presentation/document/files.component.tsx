import { useEffect, useRef, useState } from "react";
import { createEvent, formatBytes } from "../common/utils";

const FileRenderer = (props: any) => {
    const file: any = props.file;
    return (
        <div className='d-inline-block me-2 border px-2 py-1 rounded-1 bg-success-subtle'>
            <span>{file.name} ({formatBytes(file.size)})</span>
        </div>
    );
};

export const Files = ({document, onSelectFiles, className = ''}) => {
    const [files, setFiles] = useState<any>([]);
    const fileRef = useRef<any>();

    const handleFilesChange = (event: any) => {
        setFiles([...event.target.files]);
    };

    const handleClickChooseAndUploadFiles = (event) => {
        fileRef.current.click();
    };

    useEffect(() => {
        if (files.length > 0) {
            onSelectFiles && onSelectFiles(createEvent({id: 'files', value: files}));
            setFiles([]);
        }
    }, [files, onSelectFiles]);

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
            {document && document.files && document.files.map((e, index) => <FileRenderer key={`file-${index}`} file={e} />)}
        </div>
    );
};
