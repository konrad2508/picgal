import styles from './RemovableModifiableTagList.module.css';
import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import ModifiableTag from '../ModifiableTag/ModifiableTag';
import useRemovableModifiableTagListState from './useRemovableModifiableTagListState';

const RemovableModifiableTagList = ({ tagType }) => {
    const { usedContextValue } = useRemovableModifiableTagListState();

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType.overridedBy ? usedContextValue.config[tagType.overridedBy] : tagType.name}</h3>
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.button1}
                        disabled={true}
                        style={{cursor: 'default'}}
                    >
                        <FaSave className='fontAwesome'/>
                    </button>
                    <button
                        className={styles.button2}
                        onClick={usedContextValue.switchStateNormal}
                    >
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>
            {usedContextValue.tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
        </>
    );
};

export default RemovableModifiableTagList;
