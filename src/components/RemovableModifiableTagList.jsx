import styles from '../styles/RemovableModifiableTagList.module.css';
import React from 'react';
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
                        +
                    </button>
                    <button
                        className={styles.button}
                        onClick={switchStateNormal}
                    >
                        -
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
