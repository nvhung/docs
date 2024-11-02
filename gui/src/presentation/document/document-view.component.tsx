import { useDispatch, useSelector } from "react-redux";
import { Details } from "./details.component";
import { Files } from "./files.component";
import { Section } from "./section.component";
import { Tags } from "./tags.component";
import { selectDocument } from "../../core/store/document.state";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mediateRequestDocument } from "../../core/mediator";
import { ComponentMode } from "../common/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";

export const DocumentView = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const document = useSelector(selectDocument);

    useEffect(() => {
        dispatch(mediateRequestDocument(params.name));
    }, [dispatch, params]);

    const handleClickEdit = (event) => {
        navigate(`/document/${document.name}/edit`);
    };

    return (
        <>
        <div className="fw-bold fs-4 mb-3 d-flex">
            <label className="flex-fill">{document.name}</label>
            <button type="button" className={`btn btn-success me-2 ${document.name ? '' : 'd-none'}`} onClick={handleClickEdit}>
                <FontAwesomeIcon icon={faEdit} className="me-1" />
                Edit
            </button>
            <button type="button" className={`btn btn-success me-2 ${document.name ? '' : 'd-none'}`} onClick={handleClickEdit}>
                <FontAwesomeIcon icon={faRemove} className="me-1" />
                Remove
            </button>
            <button type="button" className={`btn btn-success me-2 ${document.name ? '' : 'd-none'}`} onClick={handleClickEdit}>
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                Create
            </button>
        </div>
        <Section label='Files'>
            <Files className="ms-3 mb-3" document={document} mode={ComponentMode.VIEW} />
        </Section>
        <Section label='Details' visible={!!document.name}>
            <Details className='ms-3 mb-3' mode={ComponentMode.VIEW} />
        </Section>
        <Section label='Tags' visible={!!document.name}>
            <Tags className='ms-3 mb-3' mode={ComponentMode.VIEW} />
        </Section>
        </>
    );
};
