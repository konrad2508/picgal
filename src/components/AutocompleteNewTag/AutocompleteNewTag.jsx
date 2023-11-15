import styles from '../AutocompleteQuery/AutocompleteQuery.module.css';
import React from 'react';
import useAutocompleteNewTagState from './useAutocompleteNewTagState';

const AutocompleteNewTag = ({ existingTags }) => {
    const { usedContextValue, contextValue } = useAutocompleteNewTagState();

    const addSuggestion = (e) => {
        usedContextValue.onInputChange({ target: { value: e.name.trim() } });
        contextValue.disableDisplay();
    }

    const renderSuggestions = () => {
        return (
            <div className={styles.fixedContainer}>
                { existingTags.filter(e => e.name.toLowerCase().startsWith(usedContextValue.newTagName) && usedContextValue.newTagName).map((e, i) => (
                    <div key={i} onClick={() => addSuggestion(e)} className={styles.suggestionBox}>
                        <p className={styles.suggestion}>{e.name}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container} ref={contextValue.wrapperRef}>
            <input
                value={usedContextValue.newTagName}
                onChange={usedContextValue.onInputChange}
                className={styles.input}
                onClick={contextValue.enableDisplay}
            />
            { contextValue.display && (
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
