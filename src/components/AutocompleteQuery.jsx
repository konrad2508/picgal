import styles from '../styles/Autocomplete.module.css';
import React from 'react';
import useAutocompleteState from '../hooks/useAutocompleteState';
import AutocompleteCommand from '../enums/AutocompleteCommand';

const AutocompleteQuery = ({ query, handleQueryChange, existingTags }) => {
    const { state, switchAutocompleteState } = useAutocompleteState();

    let rightQuery, leftQuery;
    if (query) {
        const splittedQuery = query.split(' ');
        rightQuery = splittedQuery.at(-1);
        leftQuery = splittedQuery.slice(0, -1).join(' ');
    }

    const enableDisplay = () => switchAutocompleteState(AutocompleteCommand.ENABLE, {  });

    const addSuggestion = (e) => {
        handleQueryChange({ target: { value: `${leftQuery} ${e.name.replace(' ', '_')} `.trimStart() } });
        switchAutocompleteState(AutocompleteCommand.DISABLE, {  });
    }

    const getSuggestions = () => {
        /*
        variables: input, suggestion
        sorting priorities:
        1. suggestion has more value if it starts with input
        2. suggestion has more value if it more closely resembles input, ie suggestion length is close to input length
        */

        return existingTags
            .filter(e => e.name.toLowerCase().includes(rightQuery) && rightQuery)
            .sort((a, b) => {
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
            })
            .slice(0, 5);
    }

    const renderSuggestions = () => {
        return (
            <>
                { getSuggestions().map((e, i) => (
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

export default AutocompleteQuery;
