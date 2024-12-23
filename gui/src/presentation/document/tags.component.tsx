import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDocument } from "../../core/store/document.state";
import { mediateRequestDocument, mediateUpdateDocumentTags } from "../../core/mediator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { createEvent } from "../common/utils";
import { ComponentMode } from "../common/constants";

const Tag = ({tag, onRemove, mode}) => {
    const handleClickRemove = (tag) => (event) => {
        onRemove(createEvent({id: 'tag', value: tag}));
    };
    return (
        <>
        {mode === ComponentMode.EDIT && (<>
            <div className="d-inline-block px-2 py-1 me-2 border rounded-2 bg-success-subtle">
                {tag}
                <button type="button" className="btn p-0 ms-2 text-danger" onClick={handleClickRemove(tag)}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
        </>)}
        {mode === ComponentMode.VIEW && <div className='d-inline-block bg-info-subtle me-2 px-2 py-1 border rounded-2'>{tag}</div>}
        </>
    );
};

export const Tags = ({className = '', mode = ComponentMode.EDIT}) => {
    const dispatch = useDispatch<any>();
    const document = useSelector(selectDocument);
    const [tags, setTags] = useState<any>([]);
    const [tag, setTag] = useState<any>('');
    const tagRef = createRef<any>();

    const handleTagChange = (event: any) => {
        setTag(event.target.value);
    };

    const handleClickAddTag = (event: any) => {
        dispatch(mediateUpdateDocumentTags({
            docName: document.name,
            tag,
            action: 'add',
            callback: (res) => {
                if (res && res.success) {
                    dispatch(mediateRequestDocument(document.name));
                    setTag('');
                    tagRef.current.focus();
                }
            }
        }));
    };

    const handleRemoveTag = (event) => {
        dispatch(mediateUpdateDocumentTags({
            docName: document.name,
            tag: event.target.value,
            action: 'remove',
            callback: (res) => {
                if (res && res.success) {
                    dispatch(mediateRequestDocument(document.name));
                }
            }
        }));
    };

    useEffect(() => {
        setTags(document.tags || []);
    }, [document]);

    return (
        <div className={className}>
            {mode === ComponentMode.EDIT && (<>
                <label className="form-label">Label</label>
                <input type="text" className="form-control" value={tag} onChange={handleTagChange} ref={tagRef} />
                <div className="mt-2">
                    <button type="button" className="btn btn-secondary" onClick={handleClickAddTag}>Add</button>
                </div>
            </>)}
            <div className='mt-2'>
            {tags.map((e, index) => <Tag key={`tag-${index}`} tag={e} mode={mode} onRemove={handleRemoveTag} />)}
            </div>
        </div>
    );
};
