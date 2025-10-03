import styles from './DeleteModifiableSavedQuery.module.css';
import React from 'react';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import useDeleteModifiableSavedQueryState from './useDeleteModifiableSavedQueryState';

const DeleteModifiableSavedQuery = ({ savedQuery }) => {
    const { usedContextValue } = useDeleteModifiableSavedQueryState();

    return (
        <div className={styles.savedQueryContainer}>
            <p>{savedQuery.name}</p>
            <div className={styles.savedQueryButtonContainer}>
                <button className={styles.button1} onClick={() => usedContextValue.onDeleteSavedQuery(savedQuery.id)}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
                <button className={styles.button2} onClick={usedContextValue.disableDeletable}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default DeleteModifiableSavedQuery;
