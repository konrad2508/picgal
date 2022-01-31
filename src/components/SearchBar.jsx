import styles from '../styles/SearchBar.module.css';
import React from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import AppState from '../enums/AppState';
import AutocompleteQuery from './AutocompleteQuery';

const SearchBar = ({ sendQuery, onBackClick, appState, query, handleQueryChange, existingTags }) => {
    return (
        <form onSubmit={sendQuery}>
            <div className={styles.form}>
                <div className={styles.backContainer}>
                    <button
                        type='button'
                        className={styles.back}
                        onClick={onBackClick}
                        disabled={appState === AppState.START}
                    >
                        <FaArrowLeft/>
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
                        <FaSearch/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
