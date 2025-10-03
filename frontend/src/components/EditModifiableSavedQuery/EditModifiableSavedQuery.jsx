import styles from './EditModifiableSavedQuery.module.css';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AutocompleteQuery from '../AutocompleteQuery/AutocompleteQuery';
import useEditModifiableSavedQueryState from './useEditModifiableSavedQueryState';

const EditModifiableSavedQuery = () => {
    const { usedContextValue } = useEditModifiableSavedQueryState();

    return (
        <div className={styles.savedQueryContainer}>
            <div className={styles.formContainer}>
                <input className={styles.nameInput} value={usedContextValue.inputName} onInput={usedContextValue.handleInputNameChange} placeholder='enter name...'/>
                <div className={styles.queryInput}>
                    <AutocompleteQuery
                        query={usedContextValue.inputQuery}
                        handleQueryChange={usedContextValue.handleInputQueryChange}
                        existingTags={usedContextValue.existingTags}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button1} onClick={usedContextValue.modifyQuery}>
                    <FaPlus className='fontAwesome'/>
                </button>
                <button className={styles.button2} onClick={usedContextValue.cancelModify}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default EditModifiableSavedQuery;
