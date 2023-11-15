import React from 'react';
import ModifiableSavedQueryContext from '../../context/ModifiableSavedQueryContext';
import AppContext from '../../context/AppContext';

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
