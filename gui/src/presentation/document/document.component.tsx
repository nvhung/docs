import { useEffect } from "react";
import { Tags } from "./tags.component";
import { Details } from "./details.component";
import { 
    mediateRequestDocument, 
    mediateSubmitDocumentFiles, 
    mediateSubmitNewDocument 
} from "../../core/mediator";
import { Files } from "./files.component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDocument } from "../../core/store/document.state";

export const Document = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const documentName = params.name;
    const document = useSelector(selectDocument);

    const handleSelectFiles = (event) => {
        if (document && document.name) {
            dispatch(mediateSubmitDocumentFiles(document.name, event.target.value, (res) => {
                if (res.success) {
                    dispatch(mediateRequestDocument(documentName));
                }
            }));
        } else {
            dispatch(mediateSubmitNewDocument(document.name, event.target.value, (res) => {
                if (res.success) {
                    navigate(`/document/${res.document.name}`);
                }
            }));
        }
    };

    useEffect(() => {
        documentName && dispatch(mediateRequestDocument(documentName));
    }, [dispatch, documentName]);

    return (
        <div>
            <div className="fw-bold fs-4 mb-3">{document && document.name ? document.name : 'New Document'}</div>
            <div className="fw-bold mb-3 border-bottom">Files</div>
            <Files className="ms-3 mb-3" document={document} onSelectFiles={handleSelectFiles} />
            <div className="fw-bold mb-3 border-bottom">Details</div>
            <Details className="ms-3 mb-3" />
            <div className="fw-bold mb-3 border-bottom">Tags</div>
            <Tags className='ms-3 mb-3' />
        </div>
    );
};
