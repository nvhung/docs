import { createRef, useEffect, useState } from "react";
import { createEvent } from "../common/utils";

const Tag = (props: any) => {
    return (
        <div className="d-inline-block px-2 py-1 me-2 border rounded-2 bg-success-subtle">{props.tag}</div>
    );
};

export const Tags = (props: any) => {
    const [tags, setTags] = useState<any>([]);
    const [tag, setTag] = useState<any>('');
    const tagRef = createRef<any>();

    const handleTagChange = (event: any) => {
        setTag(event.target.value);
    };

    const handleClickAddTag = (event: any) => {
        setTags([...tags, tag]);
        setTag('');
        tagRef.current.focus();
    };

    useEffect(() => {
        props.onChange && props.onChange(createEvent({
            id: tags,
            value: tags
        }));
    }, [tags, props]);

    return (
        <div className={props.className}>
            <label className="form-label">Label</label>
            <input type="text" className="form-control" value={tag} onChange={handleTagChange} ref={tagRef} />
            <div className="mt-2">
                <button type="button" className="btn btn-secondary" onClick={handleClickAddTag}>Add</button>
            </div>
            <div className='mt-2'>
            {props.tags && props.tags.map((e: any) => <Tag tag={e} />)}
            </div>
        </div>
    );
};
