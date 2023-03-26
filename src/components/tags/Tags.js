import React, {useEffect} from 'react';
import Tag from "./Tag";
import {useDispatch, useSelector} from "react-redux";
import {fetchTags} from "../../features/tags/tagsSlice";

function Tags(props) {
    const {tags} = useSelector((state) => state.tags)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])
    return tags?.length > 0 ? (
        <section>
            <div
                className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto"
            >
                {tags.map(tag => <Tag key={tag.id} title={tag.title}/>)}
            </div>
        </section>
    ) : null
}

export default Tags;
