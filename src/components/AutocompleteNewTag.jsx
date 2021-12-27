import styles from '../styles/Autocomplete.module.css';
import React from 'react';
import useAutocompleteState from '../hooks/useAutocompleteState';
import AutocompleteCommand from '../enums/AutocompleteCommand';

const AutocompleteNewTag = ({ query, handleQueryChange, existingTags }) => {
    const { state, switchAutocompleteState } = useAutocompleteState();

    const enableDisplay = () => switchAutocompleteState(AutocompleteCommand.ENABLE, {  });

    const addSuggestion = (e) => {
        handleQueryChange({ target: { value: e.name.trim() } });
        switchAutocompleteState(AutocompleteCommand.DISABLE, {  });
    }

    const renderSuggestions = () => {
        return (
            <>
                { existingTags.filter(e => e.name.toLowerCase().startsWith(query) && query).map((e, i) => (
                    <div key={i} onClick={() => addSuggestion(e)} className={styles.suggestionBox}>
                        <p className={styles.suggestion}>{e.name}</p>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div ref={state.wrapperRef}>
            <input
                value={query}
                onChange={handleQueryChange}
                className={styles.input}
                onClick={enableDisplay}
            />
            { state.display && (
                <div className={styles.suggestionsOuterContainer}>
                    <div className={styles.suggestionsInnerContainer}>
                    { renderSuggestions() }
                    </div>
                </div>
            )}
        </div>
    )
};

export default AutocompleteNewTag;
