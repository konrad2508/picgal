import styles from '../styles/AddNewSavedQuery.module.css';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AutocompleteQuery from './AutocompleteQuery';
import useAddNewSavedQueryState from '../hooks/useAddNewSavedQueryState';

const AddNewSavedQuery = () => {
    const { usedContextValue } = useAddNewSavedQueryState();

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <input className={styles.nameInput} value={usedContextValue.inputNewName} onInput={usedContextValue.handleInputNewName}/>
                <div className={styles.queryInput}>
                    <AutocompleteQuery
                        query={usedContextValue.inputNewQuery}
                        handleQueryChange={usedContextValue.handleInputNewQuery}
                        existingTags={usedContextValue.existingTags}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={usedContextValue.addNewSavedQuery}>
                    <FaPlus className='fontAwesome'/>
                </button>
                <button className={styles.button} onClick={usedContextValue.cancelAddingSavedQuery}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default AddNewSavedQuery;
