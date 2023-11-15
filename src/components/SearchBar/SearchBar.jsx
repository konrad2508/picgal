import styles from './SearchBar.module.css';
import React from 'react';
import { FaArrowLeft, FaTimes, FaSearch } from 'react-icons/fa';
import AutocompleteQuery from '../AutocompleteQuery/AutocompleteQuery';
import AppState from '../../enums/AppState';
import useSearchBarState from './useSearchBarState';

const SearchBar = () => {
    const { usedContextValue } = useSearchBarState();

    return (
        <form onSubmit={
            usedContextValue.appState !== AppState.BATCH_EDITING && usedContextValue.appState !== AppState.ENCRYPTOR
                ? usedContextValue.sendQuery
                : usedContextValue.sendQueryInBatchEditor}>
            <div className={styles.form}>
                <div className={styles.backContainer}>
                    <button
                        type='button'
                        className={styles.back}
                        onClick={
                            usedContextValue.appState !== AppState.BATCH_EDITING && usedContextValue.appState !== AppState.ENCRYPTOR
                                ? usedContextValue.onBackClick
                                : usedContextValue.onCancelBatchEditor
                        }
                        disabled={usedContextValue.historyLength === 0
                            && usedContextValue.appState !== AppState.BATCH_EDITING
                            && usedContextValue.appState !== AppState.ENCRYPTOR
                        }
                    >
                        { usedContextValue.appState !== AppState.BATCH_EDITING && usedContextValue.appState !== AppState.ENCRYPTOR
                            ? <FaArrowLeft className='fontAwesome'/>
                            : <FaTimes className='fontAwesome'/> }
                    </button>
                </div>
                <div className={styles.inputContainer}>
                    <AutocompleteQuery
                        query={usedContextValue.query}
                        handleQueryChange={usedContextValue.handleQueryChange}
                        existingTags={usedContextValue.existingTags}
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
