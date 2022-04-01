import styles from '../styles/EditModifiableSavedQuery.module.css';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AutocompleteQuery from './AutocompleteQuery';
import ModifiableSavedQueryContext from './context/ModifiableSavedQueryContext';
import AppContext from './context/AppContext';

const EditModifiableSavedQuery = () => {
    const { existingTags } = React.useContext(AppContext);
    const {
        inputName,
        handleInputNameChange,
        inputQuery,
        handleInputQueryChange,
        modifyQuery,
        cancelModify
    } = React.useContext(ModifiableSavedQueryContext);

    return (
        <div className={styles.savedQueryContainer}>
            <div className={styles.formContainer}>
                <input className={styles.nameInput} value={inputName} onInput={handleInputNameChange}/>
                <div className={styles.queryInput}>
                    <AutocompleteQuery
                        query={inputQuery}
                        handleQueryChange={handleInputQueryChange}
                        existingTags={existingTags}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={modifyQuery}>
                    <FaPlus className='fontAwesome'/>
                </button>
                <button className={styles.button} onClick={cancelModify}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default EditModifiableSavedQuery;
