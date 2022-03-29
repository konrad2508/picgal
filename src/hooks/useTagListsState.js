import React from 'react';
import modificationForm from '../forms/modificationForm';
import TagListsCommand from '../enums/TagListsCommand';
import tagListsStateService from '../services/tagListsStateService';

const useTagListsState = () => {
    const { form: modificationsForm, formComplements } = modificationForm();

    const [ modifications, setModifications ] = React.useState(modificationsForm);
    const [ modificationMode, setModificationMode ] = React.useState(false);

    const hookService = tagListsStateService({ setModifications, setModificationMode });

    const setTagListsState = (command, args) => {
        switch (command) {
            case TagListsCommand.ADD_MODIFICATION: {
                const { op, element } = args;

                hookService.addModificationCommand(modifications, op, element, formComplements);

                break;
            }

            case TagListsCommand.SWITCH_MODE: {
                const { id, onSaveModifiedTagsClick, mode } = args;

                hookService.switchModeCommand(mode, id, modifications, onSaveModifiedTagsClick, modificationsForm)

                break;
            }

            default: { }
        }
    };

    return {
        tagListsState: { modifications, modificationMode },
        setTagListsState
    };
};

export default useTagListsState;
