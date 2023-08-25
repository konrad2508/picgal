import styles from '../styles/CancelableModifiableTagList.module.css';
import React from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import ModifiableTag from './ModifiableTag';
import TagState from '../enums/TagState';
import ModifiableTagListContext from './context/ModifiableTagListContext';
import AppContext from './context/AppContext';

const CancelableModifiableTagList = ({ tagType }) => {
    const { config } = React.useContext(AppContext);

    const { tagList, switchStateAdd, switchStateRemove } = React.useContext(ModifiableTagListContext);
    
    const normalTags = tagList.filter(e => e.type === TagState.NORMAL).length    

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType.overridedBy ? config[tagType.overridedBy] : tagType.name}</h3>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={switchStateAdd}
                    >
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button 
                        className={styles.button}
                        disabled={normalTags === 0 ? true : false}
                        onClick={switchStateRemove}
                    >
                        <FaRegTrashAlt className='fontAwesome'/>
                    </button>
                </div>
            </div>
            <ul>
                {tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
            </ul>
        </>  
    );
};

export default CancelableModifiableTagList;
