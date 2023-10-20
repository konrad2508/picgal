import React from 'react';
import modifiableSavedQueryStateService from '../services/modifiableSavedQueryStateService';
import ModifiableSavedQueriesListContext from '../components/context/ModifiableSavedQueriesListContext';
import AppContext from '../components/context/AppContext';

const useModifiableSavedQueryState = (savedQuery) => {
    const { onModifySavedQuery } = React.useContext(AppContext);
    const { canUseSavedQueryName } = React.useContext(ModifiableSavedQueriesListContext);

    const [ modifiable, setModifiable ] = React.useState(false);
    const [ deletable, setDeletable ] = React.useState(false);
    const [ inputName, setInputName ] = React.useState(savedQuery.name);
    const [ inputQuery, setInputQuery ] = React.useState(savedQuery.query);

    const hookService = modifiableSavedQueryStateService({ setModifiable, setDeletable, setInputName, setInputQuery });

    const modifyQuery = () => hookService.modifyQueryCommand(canUseSavedQueryName, savedQuery.id, inputName, onModifySavedQuery, inputQuery);
    const cancelModify = () => hookService.cancelModifyCommand(savedQuery);
    const handleInputNameChange = (event) => hookService.handleInputNameChangeCommand(event);
    const handleInputQueryChange = (event) => hookService.handleInputQueryChangeCommand(event);
    const enableDeletable = () => hookService.enableDeletableCommand();
    const disableDeletable = () => hookService.disableDeletableCommand();
    const enableModifiable = () => hookService.enableModifiableCommand();

    const usedContextValue = {
        onModifySavedQuery,
        canUseSavedQueryName
    };

    const contextValue = {
        modifiable,
        deletable,
        inputName,
        inputQuery,
        modifyQuery,
        cancelModify,
        handleInputNameChange,
        handleInputQueryChange,
        enableDeletable,
        disableDeletable,
        enableModifiable
    };

    return {
        usedContextValue,
        contextValue
    };
};

export default useModifiableSavedQueryState;
