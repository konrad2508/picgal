import styles from '../styles/DeleteModifiableSavedQuery.module.css';
import React from 'react';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';

const DeleteModifiableSavedQuery = ({ savedQueryName, onClickDelete, onClickDisableDeletable }) => {
    return (
        <div className={styles.savedQueryContainer}>
            <h4>{savedQueryName}</h4>
            <div className={styles.savedQueryButtonContainer}>
                <button onClick={onClickDelete}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
                <button onClick={onClickDisableDeletable}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default DeleteModifiableSavedQuery;
