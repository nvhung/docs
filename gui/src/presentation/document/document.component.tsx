import { useEffect, useState } from "react";
import { Tags } from "./tags.component";
import { Details } from "./details.component";
import { 
    mediateRequestDocument
} from "../../core/mediator";
import { Files } from "./files.component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateDocumentAction, selectDocument } from "../../core/store/document.state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { equals } from '../../core/utils';

const Section = ({label, visible = true, children}) => (
    <>
    {visible && <div className="fw-bold mb-3 border-bottom">{label}</div>}
    {visible && children}
    </>
);

export const Document = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [documentName, setDocumentName] = useState<any>();
    const document = useSelector(selectDocument);

    const handleClickCreateDocument = (event) => {
        navigate('/document');
    };

    useEffect(() => {
        if (documentName) {
            !equals(documentName, document.name) && dispatch(mediateRequestDocument(documentName));
        } else {
            !equals(document, {}) && dispatch(createUpdateDocumentAction({}));
        }
    }, [dispatch, documentName, document]);

    useEffect(() => {
        setDocumentName(params.name);
    }, [params]);

    useEffect(() => {
        console.log('document', document);
    }, [document]);

    return (
        <div>
            <div className="fw-bold fs-4 mb-3 d-flex">
                <label className="flex-fill">{document && document.name ? document.name : 'New Document'}</label>
                <button type="button" className={`btn btn-success me-2 ${documentName ? '' : 'd-none'}`} onClick={handleClickCreateDocument}>
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Create New Document
                </button>
                <button type="button" disabled={true} className={`btn btn-success ${documentName ? '' : 'd-none'}`} onClick={handleClickCreateDocument}>
                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                    Delete Document
                </button>
            </div>
            <Section label='Files'>
                <Files className="ms-3 mb-3" document={document} />
            </Section>
            <Section label='Details' visible={!!document.name}>
                <Details className='ms-3 mb-3' />
            </Section>
            <Section label='Tags' visible={!!document.name}>
                <Tags className='ms-3 mb-3' />
            </Section>
        </div>
    );
};
