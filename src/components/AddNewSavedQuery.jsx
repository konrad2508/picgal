import styles from '../styles/AddNewSavedQuery.module.css';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AutocompleteQuery from './AutocompleteQuery';
import ModifiableSavedQueriesListContext from './context/ModifiableSavedQueriesListContext';
import AppContext from './context/AppContext';

const AddNewSavedQuery = () => {
    const { existingTags } = React.useContext(AppContext);
    const {
        inputNewName,
        handleInputNewName,
        inputNewQuery,
        handleInputNewQuery,
        addNewSavedQuery,
        cancelAddingSavedQuery
    } = React.useContext(ModifiableSavedQueriesListContext);

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <input className={styles.nameInput} value={inputNewName} onInput={handleInputNewName}/>
                <div className={styles.queryInput}>
                    <AutocompleteQuery
                        query={inputNewQuery}
                        handleQueryChange={handleInputNewQuery}
                        existingTags={existingTags}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={addNewSavedQuery}>
                    <FaPlus className='fontAwesome'/>
                </button>
                <button className={styles.button} onClick={cancelAddingSavedQuery}>
                    <FaTimes className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default AddNewSavedQuery;
