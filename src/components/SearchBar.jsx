import styles from '../styles/SearchBar.module.css';
import React from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import AutocompleteQuery from './AutocompleteQuery';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const SearchBar = () => {
    const { sendQuery, onBackClick, appState, query, handleQueryChange, existingTags } = React.useContext(AppContext);
    
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
                        <FaArrowLeft className='fontAwesome'/>
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
