import React from 'react';
import ModifiableTagListContext from '../components/context/ModifiableTagListContext';
import useAutocompleteState from './useAutocompleteState';

const useAutocompleteNewTagState = () => {
    const { newTagName, onInputChange } = React.useContext(ModifiableTagListContext);

    const usedContextValue = {
        newTagName,
        onInputChange
    };

    const { contextValue } = useAutocompleteState();

    return {
        usedContextValue,
        contextValue
    };
};

export default useAutocompleteNewTagState;
