import React from 'react';
import ModifiableTagListContext from '../../context/ModifiableTagListContext';
import useAutocompleteQueryState from '../AutocompleteQuery/useAutocompleteQueryState';

const useAutocompleteNewTagState = () => {
    const { newTagName, onInputChange } = React.useContext(ModifiableTagListContext);

    const usedContextValue = {
        newTagName,
        onInputChange
    };

    const { contextValue } = useAutocompleteQueryState();

    return {
        usedContextValue,
        contextValue
    };
};

export default useAutocompleteNewTagState;
