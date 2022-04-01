import styles from '../styles/CancelableModifiableTagList.module.css';
import React from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import ModifiableTag from './ModifiableTag';
import TagState from '../enums/TagState';
import ModifiableTagListContext from './context/ModifiableTagListContext';

const CancelableModifiableTagList = ({ tagType }) => {
    const { tagList, switchStateAdd, switchStateRemove } = React.useContext(ModifiableTagListContext);
    
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
