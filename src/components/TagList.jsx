import styles from '../styles/TagList.module.css';
import React from 'react';
import Tag from './Tag';
import ModifiableTagList from './ModifiableTagList';
import TagListsContext from './context/TagListsContext';
import AppContext from './context/AppContext';
import AppState from '../enums/AppState';

const TagList = ({ tagType, tags }) => {
    const { appState, config } = React.useContext(AppContext);

    const { modificationMode } = React.useContext(TagListsContext);

    if (modificationMode || appState === AppState.BATCH_EDITING) {
        return (
            <ModifiableTagList tagType={tagType} tags={tags}/>
        );
    }
    else {
        if (tags.length > 0) {
            return (
                <div className={styles.container}>
                    <h3>{tagType.overridedBy ? config[tagType.overridedBy] : tagType.name}</h3>
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
