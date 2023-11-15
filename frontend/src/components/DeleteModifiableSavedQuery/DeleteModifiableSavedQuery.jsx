import styles from './DeleteModifiableSavedQuery.module.css';
import React from 'react';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import useDeleteModifiableSavedQueryState from './useDeleteModifiableSavedQueryState';

const DeleteModifiableSavedQuery = ({ savedQuery }) => {
    const { usedContextValue } = useDeleteModifiableSavedQueryState();

    return (
        <div className={styles.savedQueryContainer}>
            <h4>{savedQuery.name}</h4>
            <div className={styles.savedQueryButtonContainer}>
                <button onClick={() => usedContextValue.onDeleteSavedQuery(savedQuery.id)}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
                <button onClick={usedContextValue.disableDeletable}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default DeleteModifiableSavedQuery;
