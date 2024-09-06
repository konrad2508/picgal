import styles from './TagList.module.css';
import React from 'react';
import Tag from '../Tag/Tag';
import ModifiableTagList from '../ModifiableTagList/ModifiableTagList';
import AppState from '../../enums/AppState';
import useTagListState from './useTagListState';

const TagList = ({ tagType, tags }) => {
    const { usedContextValue } = useTagListState();

    if (usedContextValue.modificationMode || usedContextValue.appState === AppState.BATCH_EDITING) {
        return (
            <ModifiableTagList tagType={tagType} tags={tags}/>
        );
    }
    else {
        if (tags.length > 0) {
            return (
                <div className={styles.container}>
                    <h3>{tagType.overridedBy ? usedContextValue.config[tagType.overridedBy] : tagType.name}</h3>
                    <ul>
                        {tags.map((e, i) => <Tag key={i} tag={e} color={tagType.color}/>)}
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
