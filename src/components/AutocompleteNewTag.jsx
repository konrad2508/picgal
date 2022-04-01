import styles from '../styles/Autocomplete.module.css';
import React from 'react';
import AutocompleteCommand from '../enums/AutocompleteCommand';
import useAutocompleteState from '../hooks/useAutocompleteState';
import ModifiableTagListContext from './context/ModifiableTagListContext';

const AutocompleteNewTag = ({ existingTags }) => {
    const { newTagName, onInputChange } = React.useContext(ModifiableTagListContext);

    const { autocompleteState, switchAutocompleteState } = useAutocompleteState();

    const enableDisplay = () => switchAutocompleteState(AutocompleteCommand.ENABLE_DISPLAY,  {  });
    const disableDisplay = () => switchAutocompleteState(AutocompleteCommand.DISABLE_DISPLAY, {  });

    const addSuggestion = (e) => {
        onInputChange({ target: { value: e.name.trim() } });
        disableDisplay();
    }

    const renderSuggestions = () => {
        return (
            <div className={styles.fixedContainer}>
                { existingTags.filter(e => e.name.toLowerCase().startsWith(newTagName) && newTagName).map((e, i) => (
                    <div key={i} onClick={() => addSuggestion(e)} className={styles.suggestionBox}>
                        <p className={styles.suggestion}>{e.name}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container} ref={autocompleteState.wrapperRef}>
            <input
                value={newTagName}
                onChange={onInputChange}
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

export default AutocompleteNewTag;
