import styles from '../styles/CancelableModifiableTagList.module.css';
import React from 'react';
import TagState from '../enums/TagState';
import ModifiableTag from './ModifiableTag';

const CancelableModifiableTagList = ({ tagType, tagList, tagListState, onCancelModification, switchStateAdd, switchStateRemove }) => {
    const normalTags = tagList.filter(e => e.type === TagState.NORMAL).length    

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType}</h3>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={switchStateAdd}
                    >
                        +
                    </button>
                    <button 
                        className={styles.button}
                        disabled={normalTags === 0 ? true : false}
                        onClick={switchStateRemove}
                    >
                        -
                    </button>
                </div>
            </div>
            <ul>
                {tagList.map((e, i) => <ModifiableTag key={i} tag={e} tagListState={tagListState} onCancelModification={onCancelModification}/>)}
            </ul>
        </>  
    );
};

export default CancelableModifiableTagList;
