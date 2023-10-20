import styles from '../styles/RemovableModifiableTagList.module.css';
import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import ModifiableTag from './ModifiableTag';
import useRemovableModifiableTagListState from '../hooks/useRemovableModifiableTagListState';

const RemovableModifiableTagList = ({ tagType }) => {
    const { usedContextValue } = useRemovableModifiableTagListState();

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType.overridedBy ? usedContextValue.config[tagType.overridedBy] : tagType.name}</h3>
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.button}
                        disabled={true}
                    >
                        <FaSave className='fontAwesome'/>
                    </button>
                    <button
                        className={styles.button}
                        onClick={usedContextValue.switchStateNormal}
                    >
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>
            <ul>
                {usedContextValue.tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
            </ul>
        </>
    );
};

export default RemovableModifiableTagList;
