import React from 'react';
import modificationForm from '../forms/modificationForm';
import tagListsStateService from '../services/tagListsStateService';
import AppContext from '../components/context/AppContext';

const useTagListsState = (img) => {
    const { onSaveModifiedTagsClick, onSaveModifiedTagsClickInBatchEditor } = React.useContext(AppContext);

    const { form: modificationsForm, formComplements } = modificationForm();

    const [ modifications, setModifications ] = React.useState(modificationsForm);
    const [ modificationMode, setModificationMode ] = React.useState(false);

    const hookService = tagListsStateService({ setModifications, setModificationMode });

    const onModificationsChange  = (op, element) => hookService.addModificationCommand(modifications, op, element, formComplements);
    const changeModificationMode = (mode) => hookService.switchModeCommand(mode, img?.id, modifications, onSaveModifiedTagsClick, modificationsForm);
    const changeModificationModeInBatchEditor = (mode) =>
        hookService.switchModeCommand(mode, null, modifications, onSaveModifiedTagsClickInBatchEditor, modificationsForm);

    const usedContextValue = {
        onSaveModifiedTagsClick,
        onSaveModifiedTagsClickInBatchEditor
    };

    const contextValue = {
        modifications,
        modificationMode,
        onModificationsChange,
        changeModificationMode,
        changeModificationModeInBatchEditor
    };

    return {
        usedContextValue,
        contextValue
    };
};

export default useTagListsState;
