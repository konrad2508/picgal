import React from 'react';
import savedQueriesListStateService from '../../services/savedQueriesListStateService';
import AppContext from '../../context/AppContext';

const useSavedQueriesListState = () => {
    const {
        savedQueries,
        onClickSavedQuery,
        onClickSavedQueryInBatchEditor,
        appState
    } = React.useContext(AppContext);

    const [ displaySavedQueries, setDisplaySavedQueries ] = React.useState(false);
    const [ modificationMode, setModificatonMode ] = React.useState(false);

    const hookService = savedQueriesListStateService({ setDisplaySavedQueries, setModificatonMode });

    const executeSavedQuery = (savedQuery) => hookService.executeSavedQueryCommand(savedQuery, onClickSavedQuery);
    const toggleDisplaySavedQueries = () => hookService.toggleDisplaySavedQueriesCommand(displaySavedQueries);
    const enterModificationMode = () => hookService.enterModificationModeCommand();
    const exitModificationMode = () => hookService.exitModificationModeCommand();
    const executeSavedQueryInBatchEditor = (savedQuery) => hookService.executeSavedQueryCommand(savedQuery, onClickSavedQueryInBatchEditor);

    const usedContextValue = {
        savedQueries,
        onClickSavedQuery,
        onClickSavedQueryInBatchEditor,
        appState
    };

    const contextValue = {
        displaySavedQueries,
        modificationMode,
        executeSavedQuery,
        toggleDisplaySavedQueries,
        enterModificationMode,
        exitModificationMode,
        executeSavedQueryInBatchEditor
    };

    return {
        usedContextValue,
        contextValue
    };
};

export default useSavedQueriesListState;
