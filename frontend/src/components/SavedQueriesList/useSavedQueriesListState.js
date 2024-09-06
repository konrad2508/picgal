import React from 'react';
import savedQueriesListStateService from '../../services/savedQueriesListStateService';
import AppContext from '../../context/AppContext';

const useSavedQueriesListState = () => {
    const {
        savedQueries,
        onClickSavedQuery,
        onClickSavedQueryInMultiselect,
        appState
    } = React.useContext(AppContext);

    const [ displaySavedQueries, setDisplaySavedQueries ] = React.useState(false);
    const [ modificationMode, setModificatonMode ] = React.useState(false);

    const hookService = savedQueriesListStateService({ setDisplaySavedQueries, setModificatonMode });

    const executeSavedQuery = (savedQuery) => hookService.executeSavedQueryCommand(savedQuery, onClickSavedQuery);
    const toggleDisplaySavedQueries = () => hookService.toggleDisplaySavedQueriesCommand(displaySavedQueries);
    const enterModificationMode = () => hookService.enterModificationModeCommand();
    const exitModificationMode = () => hookService.exitModificationModeCommand();
    const executeSavedQueryInMultiselect = (savedQuery) => hookService.executeSavedQueryCommand(savedQuery, onClickSavedQueryInMultiselect);

    const usedContextValue = {
        savedQueries,
        onClickSavedQuery,
        onClickSavedQueryInMultiselect,
        appState
    };

    const contextValue = {
        displaySavedQueries,
        modificationMode,
        executeSavedQuery,
        toggleDisplaySavedQueries,
        enterModificationMode,
        exitModificationMode,
        executeSavedQueryInMultiselect
    };

    return {
        usedContextValue,
        contextValue
    };
};

export default useSavedQueriesListState;
