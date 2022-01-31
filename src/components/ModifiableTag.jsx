import styles from '../styles/ModifiableTag.module.css';
import React from 'react';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import TagListState from '../enums/TagListState';
import TagState from '../enums/TagState';
import queryService from '../services/queryService';

const ModifiableTag = ({ tag, tagListState, onRemoveTag, onCancelModification }) => {
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

    if (tagListState === TagListState.REMOVE && tag.type === TagState.NORMAL) {
        return (
            <div className={styles.container}>
                <li style={tagStyle}>{displayName}</li>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => onRemoveTag(tag.name)}>
                        <FaRegTrashAlt/>
                    </button>
                </div>
            </div>
        );
    }
    else if (tagListState === TagListState.REMOVE || tag.type === TagState.NORMAL) {
        return (
            <li style={tagStyle}>{displayName}</li>
        );
    }
    else {
        return (
            <div className={styles.container}>
                <li style={tagStyle}>{displayName}</li>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => onCancelModification(tag.name, tag.type)}>
                        <FaTimes/>
                    </button>
                </div>
            </div>
        );
    }
};

export default ModifiableTag;
