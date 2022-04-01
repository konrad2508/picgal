import styles from '../styles/TagList.module.css';
import React from 'react';
import Tag from './Tag';
import ModifiableTagList from './ModifiableTagList';
import TagListsContext from './context/TagListsContext';

const TagList = ({ tagType, tags }) => {
    const { modificationMode } = React.useContext(TagListsContext);
    
    if (modificationMode) {
        return (
            <ModifiableTagList tagType={tagType} tags={tags}/>
        );
    }
    else {
        if (tags.length > 0) {
            return (
                <div className={styles.container}>
                    <h3>{tagType}</h3>
                    <ul>
                        {tags.map((e, i) => <Tag key={i} tag={e}/>)}
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
