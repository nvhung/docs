import { createRef, useEffect, useState } from "react";
import { mediateRemoveDocumentDetail, mediateRequestDocument, mediateSubmitDocumentDetail } from "../../core/mediator";
import { useDispatch, useSelector } from "react-redux";
import { selectDocument } from "../../core/store/document.state";
import { createEvent } from "../common/utils";

const emptyDetail = {
    name: '',
    type: 'string',
    value: ''
};

const Detail = ({detail, onClick}) => {
    const {name, value} = detail;
    const handleClick = (event) => onClick(createEvent({id: 'detail', value: detail}));
    return (
        <button className="btn btn-light me-2 px-2 py-1" onClick={handleClick}>{name} = {value}</button>
    );
};

export const Details = ({className = ''}) => {
    const dispatch = useDispatch<any>();
    const document = useSelector(selectDocument);
    const [details, setDetails] = useState<any>([]);
    const [detail, setDetail] = useState<any>(emptyDetail);
    const detailNameRef = createRef<any>();
    const detailValueRef = createRef<any>();

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

    const handleClickDetail = (event) => {
        setDetail(event.target.value);
    };

    const handleClickAddDetail = (event: any) => {
        dispatch(mediateSubmitDocumentDetail(document.name, detail, () => {
            dispatch(mediateRequestDocument(document.name));
        }));
        setDetail(emptyDetail);
        detailNameRef.current.focus();
    };

    const handleClickRemoveDetail = (event) => {
        dispatch(mediateRemoveDocumentDetail(document.name, detail.name, () => {
            dispatch(mediateRequestDocument(document.name));
            setDetail(emptyDetail);
        }));
    };

    useEffect(() => {
        document && setDetails(document.details || []);
    }, [document]);

    useEffect(() => {
        console.log('detail', detail);
    }, [detail]);

    return (
        <div className={className}>
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={detail.name} onChange={handleDetailNameChange} ref={detailNameRef} />
            <label className="form-label">Value</label>
            <input type="text" className="form-control" value={detail.value} onChange={handleDetailValueChange} ref={detailValueRef} />
            <div className="mt-2">
                <button type="button" className="btn btn-secondary me-2" onClick={handleClickAddDetail}>Add or Update</button>
                <button type="button" className="btn btn-secondary" onClick={handleClickRemoveDetail}>Remove</button>
            </div>
            <div className='mt-2'>
                {details.map((e: any) => <Detail detail={e} onClick={handleClickDetail} />)}
            </div>
        </div>
    );
};
