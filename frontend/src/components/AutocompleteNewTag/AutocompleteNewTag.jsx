import styles from '../AutocompleteQuery/AutocompleteQuery.module.css';
import React from 'react';
import useAutocompleteNewTagState from './useAutocompleteNewTagState';

const AutocompleteNewTag = ({ existingTags }) => {
    const { usedContextValue, contextValue } = useAutocompleteNewTagState();

    const addSuggestion = (e) => {
        usedContextValue.onInputChange({ target: { value: e.name.trim() } });
        contextValue.disableDisplay();
    };

    const tagCountFormatter = (tagCount) => {
        const abbrevs = 'kMBTq';

        if (isNaN(tagCount)) {
            return '';
        }

        if (tagCount < 1e3) {
            return tagCount;
        }
        
        let i = 0;
        let low = 1e3;
        let high = 1e6;
        while (i < abbrevs.length) {
            if (!(low <= tagCount && tagCount < high)) {
                low *= 1e3;
                high *= 1e3;
                i++;

                continue;
            }

            // [1.0x, 10x)
            if (tagCount < low * 1e1) {
                const hundreds = Math.floor(tagCount / (low / 1e1));
                
                return `${hundreds === 10 ? '1.0' : hundreds / 10}${abbrevs[i]}`;
            }
            
            // [10x, 1000x)
            else {
                const thousands = Math.floor(tagCount / low);

                return `${thousands}${abbrevs[i]}`;
            }
        }

        return `999${abbrevs[abbrevs.length - 1]}+`;
    };

    const renderSuggestions = (suggestions) => {
        return (
            <div className={styles.fixedContainer}>
                { suggestions.map((e, i) => (
                    <div key={i} onClick={() => addSuggestion(e)} className={styles.suggestionBox}>
                        <div className={styles.suggestion}>{e.name}</div>
                        <div className={styles.counter}>{tagCountFormatter(e.count)}</div>
                    </div>
                ))}
            </div>
        );
    };

    const suggestedTags = existingTags.filter(e => e.name.toLowerCase().startsWith(usedContextValue.newTagName) && usedContextValue.newTagName);

    return (
        <div className={styles.container} ref={contextValue.wrapperRef}>
            <input
                value={usedContextValue.newTagName}
                onChange={usedContextValue.onInputChange}
                className={styles.input}
                onClick={contextValue.enableDisplay}
                placeholder='enter tag...'
            />
            { contextValue.display && suggestedTags.length > 0 && (
                <div className={styles.suggestionsOuterContainer}>
                    <div className={styles.suggestionsInnerContainer}>
                        { renderSuggestions(suggestedTags) }
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutocompleteNewTag;
