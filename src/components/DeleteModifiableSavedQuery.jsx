import styles from '../styles/DeleteModifiableSavedQuery.module.css';
import React from 'react';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import ModifiableSavedQueryContext from './context/ModifiableSavedQueryContext';
import AppContext from './context/AppContext';

const DeleteModifiableSavedQuery = ({ savedQuery }) => {
    const { onDeleteSavedQuery } = React.useContext(AppContext);
    const { disableDeletable } = React.useContext(ModifiableSavedQueryContext);

    return (
        <div className={styles.savedQueryContainer}>
            <h4>{savedQuery.name}</h4>
            <div className={styles.savedQueryButtonContainer}>
                <button onClick={() => onDeleteSavedQuery(savedQuery.id)}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
                <button onClick={disableDeletable}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default DeleteModifiableSavedQuery;
