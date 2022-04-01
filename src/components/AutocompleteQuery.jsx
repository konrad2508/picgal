import styles from '../styles/Autocomplete.module.css';
import React from 'react';
import AutocompleteCommand from '../enums/AutocompleteCommand';
import TagMetatype from '../enums/TagMetatype';
import useAutocompleteState from '../hooks/useAutocompleteState';
import queryService from '../services/queryService';

const AutocompleteQuery = ({ query, handleQueryChange, existingTags }) => {
    const { autocompleteState, switchAutocompleteState } = useAutocompleteState(existingTags);

    const enableDisplay = () => switchAutocompleteState(AutocompleteCommand.ENABLE_DISPLAY, {  });
    const disableDisplay = () => switchAutocompleteState(AutocompleteCommand.DISABLE_DISPLAY, {  });
    const enableVirtualTagMode = (subtags) => switchAutocompleteState(AutocompleteCommand.ENABLE_VIRTUAL_TAG_MODE, { subtags });
    const disableVirtualTagMode = () => switchAutocompleteState(AutocompleteCommand.DISABLE_VIRTUAL_TAG_MODE, {  });

    let rightQuery, leftQuery;
    if (query) {
        const splittedQuery = query.split(' ');
        rightQuery = splittedQuery.at(-1);
        leftQuery = splittedQuery.slice(0, -1).join(' ');

        if (rightQuery.includes(':')) {
            const potentialVirtualTag = queryService.findPotentialVirtualTag(rightQuery, existingTags);

            if (potentialVirtualTag !== undefined && !autocompleteState.virtualTagMode) {
                enableVirtualTagMode(potentialVirtualTag.subtags);
            }
        }
        else if (autocompleteState.virtualTagMode) {
            disableVirtualTagMode();
        }
    }

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.tagType === TagMetatype.VIRTUAL) {
            activateSubtags(suggestion);
        }
        else if (suggestion.tagType === TagMetatype.NORMAL) {
            addSuggestion(suggestion);
        }
    };

    const activateSubtags = (suggestion) => {
        const newInput = `${leftQuery} ${queryService.normalVirtualTagToInputVirtualTag(suggestion.name)}`.trimStart()
        
        handleQueryChange({ target: { value: newInput } });
        enableVirtualTagMode(suggestion.subtags);
    };

    const addSuggestion = (suggestion) => {
        const newInput = `${leftQuery} ${queryService.normalTagToInputTag(suggestion.name)} `.trimStart()

        handleQueryChange({ target: { value: newInput } });
        disableDisplay();
        disableVirtualTagMode();
    }

    const getSuggestions = () => {
        const sortingFunction = (a, b) => {
            let aScore = 0;
            let bScore = 0;

            if (a.name.startsWith(rightQuery)) {
                aScore += 2;
            }
            if (b.name.startsWith(rightQuery)) {
                bScore += 2;
            }

            if (a.name.length < b.name.length) {
                aScore += 1;
            }
            else if (b.name.length < a.name.length) {
                bScore += 1;
            }

            return bScore - aScore;
        };

        const suggestions = autocompleteState.virtualTagMode
            ? autocompleteState.subtagList
            : existingTags;

        return suggestions
            .filter(e => e.name.toLowerCase().includes(rightQuery) && rightQuery)
            .sort(sortingFunction)
            .slice(0, 5);
    }

    const renderSuggestions = () => {
        return (
            <div className={styles.fixedContainer}>
                { getSuggestions().map((e, i) => (
                    <div key={i} onClick={() => handleSuggestionClick(e)} className={styles.suggestionBox}>
                        <p className={styles.suggestion}>{e.name}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container} ref={autocompleteState.wrapperRef}>
            <input
                value={query}
                onChange={handleQueryChange}
                className={styles.input}
                onClick={enableDisplay}
            />
            { autocompleteState.display && (
                <div className={styles.suggestionsOuterContainer}>
                    <div className={styles.suggestionsInnerContainer}>
                        { renderSuggestions() }
                    </div>
                </div>
            )}
        </div>
    )
};

export default AutocompleteQuery;
