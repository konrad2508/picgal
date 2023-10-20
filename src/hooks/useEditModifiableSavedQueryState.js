import React from 'react';
import ModifiableSavedQueryContext from '../components/context/ModifiableSavedQueryContext';
import AppContext from '../components/context/AppContext';

const useEditModifiableSavedQueryState = () => {
    const { existingTags } = React.useContext(AppContext);
    const {
        inputName,
        handleInputNameChange,
        inputQuery,
        handleInputQueryChange,
        modifyQuery,
        cancelModify
    } = React.useContext(ModifiableSavedQueryContext);

    const usedContextValue = {
        existingTags,
        inputName,
        handleInputNameChange,
        inputQuery,
        handleInputQueryChange,
        modifyQuery,
        cancelModify
    };

    return {
        usedContextValue
    };
};

export default useEditModifiableSavedQueryState
