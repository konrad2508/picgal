import React from 'react';
import AppContext from '../../context/AppContext';
import SavedQueriesListContext from '../../context/SavedQueriesListContext';
import modifiableSavedQueriesListStateService from '../../services/modifiableSavedQueriesListStateService';

const useModifiableSavedQueriesListState = () => {
    const { exitModificationMode } = React.useContext(SavedQueriesListContext);
    const { savedQueries, onAddSavedQuery } = React.useContext(AppContext);

    const [ addingSavedQuery, setAddingSavedQuery ] = React.useState(false);
    const [ inputNewName, setInputNewName ] = React.useState('');
    const [ inputNewQuery, setInputNewQuery ] = React.useState('');

    const hookService = modifiableSavedQueriesListStateService({ setAddingSavedQuery, setInputNewName, setInputNewQuery });

    const canUseSavedQueryName = (id, name) => {
        if (name === '') {
            return false;
        }

        const potentialDuplicate = savedQueries.find((e) => e.name === name && e.id !== id);
        if (potentialDuplicate) {
            return false;
        }

        return true;
    };

    const startAddingSavedQuery = () => hookService.startAddingSavedQueryCommand();
    const handleInputNewName = (event) => hookService.handleInputNewNameCommand(event);
    const handleInputNewQuery = (event) => hookService.handleInputNewQueryCommand(event);
    const addNewSavedQuery = () => hookService.addSavedQueryCommand(canUseSavedQueryName, inputNewName, inputNewQuery, onAddSavedQuery);
    const cancelAddingSavedQuery = () => hookService.cancelAddingSavedQueryCommand();

    const usedContextValue = {
        exitModificationMode,
        savedQueries,
        onAddSavedQuery
    };

    const contextValue = {
        addingSavedQuery,
        inputNewName,
        inputNewQuery,
        canUseSavedQueryName,
        startAddingSavedQuery,
        handleInputNewName,
        handleInputNewQuery,
        addNewSavedQuery,
        cancelAddingSavedQuery
    };

    return {
        usedContextValue,
        contextValue
    };
};

export default useModifiableSavedQueriesListState;
