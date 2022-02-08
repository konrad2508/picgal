import styles from '../styles/EditModifiableSavedQuery.module.css';
import React from 'react';
import AutocompleteQuery from './AutocompleteQuery';
import { FaPlus, FaTimes } from 'react-icons/fa';

const EditModifiableSavedQuery = ({ inputName,
                                    onInputName,
                                    inputQuery,
                                    onInputQuery,
                                    existingTags,
                                    onClickModifyQuery,
                                    onClickCancelModify }) => {
    return (
        <div className={styles.savedQueryContainer}>
            <div className={styles.formContainer}>
                <input className={styles.nameInput} value={inputName} onInput={onInputName}/>
                <div className={styles.queryInput}>
                    <AutocompleteQuery
                        query={inputQuery}
                        handleQueryChange={onInputQuery}
                        existingTags={existingTags}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={onClickModifyQuery}>
                    <FaPlus className='fontAwesome'/>
                </button>
                <button className={styles.button} onClick={onClickCancelModify}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default EditModifiableSavedQuery;
