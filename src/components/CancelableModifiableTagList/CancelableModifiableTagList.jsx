import styles from './CancelableModifiableTagList.module.css';
import React from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import ModifiableTag from '../ModifiableTag/ModifiableTag';
import TagState from '../../enums/TagState';
import useCancelableModifiableTagListState from './useCancelableModifiableTagListState';

const CancelableModifiableTagList = ({ tagType }) => {
    const { usedContextValue } = useCancelableModifiableTagListState();

    const normalTags = usedContextValue.tagList.filter(e => e.type === TagState.NORMAL).length    

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType.overridedBy ? usedContextValue.config[tagType.overridedBy] : tagType.name}</h3>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={usedContextValue.switchStateAdd}
                    >
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button 
                        className={styles.button}
                        disabled={normalTags === 0 ? true : false}
                        onClick={usedContextValue.switchStateRemove}
                    >
                        <FaRegTrashAlt className='fontAwesome'/>
                    </button>
                </div>
            </div>
            <ul>
                {usedContextValue.tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
            </ul>
        </>  
    );
};

export default CancelableModifiableTagList;
