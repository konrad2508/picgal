import styles from './ModifiableTag.module.css';
import React from 'react';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import TagListState from '../../enums/TagListState';
import TagState from '../../enums/TagState';
import queryService from '../../services/queryService';
import useModifiableTagState from './useModifiableTagState';

const ModifiableTag = ({ tag }) => {
    const { usedContextValue } = useModifiableTagState();

    const getColour = (type) => {
        if (type === TagState.ADDED) {
            return 'green';
        }
        else if (type === TagState.REMOVED) {
            return 'red';
        }
        else {
            return 'black';
        }
    };
    
    const tagStyle = {
        color: getColour(tag.type)
    };

    const displayName = queryService.inputTagToNormalTag(tag.name);

    if (usedContextValue.tagListState === TagListState.REMOVE && tag.type === TagState.NORMAL) {
        return (
            <div className={styles.container}>
                <p style={tagStyle}>{displayName}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => usedContextValue.onRemoveTag(tag.name)}>
                        <FaRegTrashAlt className='fontAwesome'/>
                    </button>
                </div>
            </div>
        );
    }
    else if (usedContextValue.tagListState === TagListState.REMOVE || tag.type === TagState.NORMAL) {
        return (
            <p style={tagStyle}>{displayName}</p>
        );
    }
    else {
        return (
            <div className={styles.container}>
                <p style={tagStyle}>{displayName}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => usedContextValue.onCancelModification(tag.name, tag.type)}>
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>
        );
    }
};

export default ModifiableTag;
