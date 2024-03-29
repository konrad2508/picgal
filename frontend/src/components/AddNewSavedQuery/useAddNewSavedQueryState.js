import React from 'react';
import ModifiableSavedQueriesListContext from '../../context/ModifiableSavedQueriesListContext';
import AppContext from '../../context/AppContext';

const useAddNewSavedQueryState = () => {
    const { existingTags } = React.useContext(AppContext);
    const {
        inputNewName,
        handleInputNewName,
        inputNewQuery,
        handleInputNewQuery,
        addNewSavedQuery,
        cancelAddingSavedQuery
    } = React.useContext(ModifiableSavedQueriesListContext);

    const usedContextValue = {
        existingTags,
        inputNewName,
        handleInputNewName,
        inputNewQuery,
        handleInputNewQuery,
        addNewSavedQuery,
        cancelAddingSavedQuery
    };

    return {
        usedContextValue
    };
};

export default useAddNewSavedQueryState;
