import styles from '../styles/AddNewSavedQuery.module.css';
import React from 'react';
import AutocompleteQuery from './AutocompleteQuery';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AddNewSavedQuery = ({ inputNewName,
                            onInputNewName,
                            inputNewQuery,
                            onInputNewQuery,
                            existingTags,
                            onClickAddNewSavedQuery,
                            onClickCancelAddingSavedQuery }) => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <input className={styles.nameInput} value={inputNewName} onInput={onInputNewName}/>
                <div className={styles.queryInput}>
                    <AutocompleteQuery
                        query={inputNewQuery}
                        handleQueryChange={onInputNewQuery}
                        existingTags={existingTags}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={onClickAddNewSavedQuery}>
                    <FaPlus className='fontAwesome'/>
                </button>
                <button className={styles.button} onClick={onClickCancelAddingSavedQuery}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default AddNewSavedQuery;
