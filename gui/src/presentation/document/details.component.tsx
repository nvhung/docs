import { createRef, useEffect, useState } from "react";
import { mediateRequestDocument, mediateSubmitDocumentDetail } from "../../core/mediator";
import { useDispatch, useSelector } from "react-redux";
import { selectDocument } from "../../core/store/document.state";

const emptyDetail = {
    name: '',
    type: 'string',
    value: ''
};

const Detail = (props: any) => {
    const {name, value} = props.detail;
    return (
        <div className="d-inline-block px-2 py-1 me-2 border rounded-2 bg-success-subtle">
            <label className="me-1">{name}</label>=<label className="ms-1">{value}</label>
        </div>
    );
};

export const Details = ({className = ''}) => {
    const dispatch = useDispatch<any>();
    const document = useSelector(selectDocument);
    const [details, setDetails] = useState<any>([]);
    const [detail, setDetail] = useState<any>(emptyDetail);
    const detailNameRef = createRef<any>();

    const handleDetailNameChange = (event: any) => {
        setDetail({
            ...detail,
            name: event.target.value
        });
    };

    const handleDetailValueChange = (event: any) => {
        setDetail({
            ...detail,
            value: event.target.value
        });
    };

    const handleClickAddDetail = (event: any) => {
        dispatch(mediateSubmitDocumentDetail(document.name, detail, () => {
            dispatch(mediateRequestDocument(document.name));
        }));
        setDetail(emptyDetail);
        detailNameRef.current.focus();
    };

    useEffect(() => {
        document && setDetails(document.details || []);
    }, [document]);

    return (
        <div className={className}>
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={detail.name} onChange={handleDetailNameChange} ref={detailNameRef} />
            <label className="form-label">Value</label>
            <input type="text" className="form-control" value={detail.value} onChange={handleDetailValueChange} />
            <div className="mt-2">
                <button type="button" className="btn btn-secondary" onClick={handleClickAddDetail}>Add or Update</button>
            </div>
            <div className='mt-2'>
                {details.map((e: any) => <Detail detail={e} />)}
            </div>
        </div>
    );
};
