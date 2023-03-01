import styles from '../styles/SearchBar.module.css';
import React from 'react';
import { FaArrowLeft, FaTimes, FaSearch } from 'react-icons/fa';
import AutocompleteQuery from './AutocompleteQuery';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const SearchBar = () => {
    const {
        sendQuery,
        sendQueryInBatchEditor,
        onBackClick,
        onCancelBatchEditor,
        appState,
        query,
        handleQueryChange,
        existingTags,
        historyLength
    } = React.useContext(AppContext);
    
    return (
        <form onSubmit={appState !== AppState.BATCH_EDITING ? sendQuery : sendQueryInBatchEditor}>
            <div className={styles.form}>
                <div className={styles.backContainer}>
                    <button
                        type='button'
                        className={styles.back}
                        onClick={appState !== AppState.BATCH_EDITING ? onBackClick : onCancelBatchEditor}
                        disabled={historyLength === 0 && appState !== AppState.BATCH_EDITING}
                    >
                        { appState !== AppState.BATCH_EDITING
                            ? <FaArrowLeft className='fontAwesome'/>
                            : <FaTimes className='fontAwesome'/> }
                    </button>
                </div>
                <div className={styles.inputContainer}>
                    <AutocompleteQuery
                        query={query}
                        handleQueryChange={handleQueryChange}
                        existingTags={existingTags}
                    />
                </div>
                <div className={styles.goContainer}>
                    <button type="submit" className={styles.go}>
                        <FaSearch className='fontAwesome'/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
