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
            !AppState.isMultiselect(usedContextValue.appState)
                ? usedContextValue.sendQuery
                : usedContextValue.sendQueryInMultiselect}>
            <div className={styles.form}>
                <div className={styles.backContainer}>
                    <button
                        type='button'
                        className={styles.back}
                        onClick={
                            !AppState.isMultiselect(usedContextValue.appState)
                                ? usedContextValue.onBackClick
                                : usedContextValue.onCancelMultiselect
                        }
                        disabled={usedContextValue.historyLength === 0 && !AppState.isMultiselect(usedContextValue.appState)}
                    >
                        { !AppState.isMultiselect(usedContextValue.appState)
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
