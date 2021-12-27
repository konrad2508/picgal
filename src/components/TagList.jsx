import styles from '../styles/TagList.module.css';
import React from 'react';
import Tag from './Tag'
import ModifiableTagList from './ModifiableTagList';

const TagList = ({  tagType,
                    tags,
                    onClickTag,
                    modificationMode,
                    onModificationsChange,
                    existingTags }) => {
    if (modificationMode) {
        return (
            <ModifiableTagList
                tagType={tagType}
                tags={tags}
                onModificationsChange={onModificationsChange}
                existingTags={existingTags}
            />
        );
    }
    else {
        if (tags.length > 0) {
            return (
                <div className={styles.container}>
                    <h3>{tagType}</h3>
                    <ul>
                        {tags.map((e, i) => <Tag key={i} tag={e} onClickTag={onClickTag}/>)}
                    </ul>
                </div>
            );
        }
        else {
            return null;
        }
    }
};

export default TagList;
