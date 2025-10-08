import styles from './ModifiableSavedQuery.module.css';
import React from 'react';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import EditModifiableSavedQuery from '../EditModifiableSavedQuery/EditModifiableSavedQuery';
import DeleteModifiableSavedQuery from '../DeleteModifiableSavedQuery/DeleteModifiableSavedQuery';
import useModifiableSavedQueryState from './useModifiableSavedQueryState';
import ModifiableSavedQueryContext from '../../context/ModifiableSavedQueryContext';

const ModifiableSavedQuery = ({ savedQuery }) => {
    const { contextValue } = useModifiableSavedQueryState(savedQuery);

    if (contextValue.modifiable) {
        return (
            <ModifiableSavedQueryContext.Provider value={contextValue}>
                <EditModifiableSavedQuery/>
            </ModifiableSavedQueryContext.Provider>
        );
    }

    if (contextValue.deletable) {
        return (
            <ModifiableSavedQueryContext.Provider value={contextValue}>
                <DeleteModifiableSavedQuery savedQuery={savedQuery}/>
            </ModifiableSavedQueryContext.Provider>
        );
    }

    return (
        <div className={styles.savedQueryContainer}>
            <p className={styles.savedQuery} title={savedQuery.name}>{savedQuery.name}</p>
            <div className={styles.savedQueryButtonContainer}>
                <button className={styles.button1} onClick={contextValue.enableModifiable}>
                    <FaPen className='fontAwesome'/>
                </button>
                <button className={styles.button2} onClick={contextValue.enableDeletable}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default ModifiableSavedQuery;