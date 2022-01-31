import styles from '../styles/RemovableModifiableTagList.module.css';
import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import ModifiableTag from './ModifiableTag';

const RemovableModifiableTagList = ({ tagType, switchStateNormal, tagList, tagListState, onRemoveTag }) => {
    return (
        <>
            <div className={styles.container}>
                <h3>{tagType}</h3>
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.button}
                        disabled={true}
                    >
                        <FaSave/>
                    </button>
                    <button
                        className={styles.button}
                        onClick={switchStateNormal}
                    >
                        <FaTimes/>
                    </button>
                </div>
            </div>
            <ul>
                {tagList.map((e, i) => <ModifiableTag key={i} tag={e} tagListState={tagListState} onRemoveTag={onRemoveTag}/>)}
            </ul>
        </>
    );
};

export default RemovableModifiableTagList;
