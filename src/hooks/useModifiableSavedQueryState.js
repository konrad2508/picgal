import React from 'react';
import ModifiableSavedQueryCommand from '../enums/ModifiableSavedQueryCommand';
import modifiableSavedQueryStateService from '../services/modifiableSavedQueryStateService';

const useModifiableSavedQueryState = (savedQuery) => {
    const [ modifiable, setModifiable ] = React.useState(false);
    const [ deletable, setDeletable ] = React.useState(false);
    const [ inputName, setInputName ] = React.useState(savedQuery.name);
    const [ inputQuery, setInputQuery ] = React.useState(savedQuery.query);

    const hookService = modifiableSavedQueryStateService({ setModifiable, setDeletable, setInputName, setInputQuery });

    const setModifiableSavedQueryState = (command, args) => {
        switch (command) {
            case ModifiableSavedQueryCommand.HANDLE_INPUT_NAME_CHANGE: {
                const { event } = args;

                hookService.handleInputNameChangeCommand(event);

                break;
            }

            case ModifiableSavedQueryCommand.HANDLE_INPUT_QUERY_CHANGE: {
                const { event } = args;

                hookService.handleInputQueryChangeCommand(event);

                break;
            }

            case ModifiableSavedQueryCommand.MODIFY_QUERY: {
                const { canUseSavedQueryName, onModifySavedQuery } = args;

                hookService.modifyQueryCommand(canUseSavedQueryName, savedQuery.id, inputName, onModifySavedQuery, inputQuery);

                break;
            }

            case ModifiableSavedQueryCommand.CANCEL_MODIFY: {
                hookService.cancelModifyCommand(savedQuery);

                break;
            }

            case ModifiableSavedQueryCommand.ENABLE_DELETABLE: {
                hookService.enableDeletableCommand();

                break;
            }

            case ModifiableSavedQueryCommand.DISABLE_DELETABLE: {
                hookService.disableDeletableCommand();

                break;
            }

            case ModifiableSavedQueryCommand.ENABLE_MODIFIABLE: {
                hookService.enableModifiableCommand();

                break;
            }

            default: { }
        }
    };

    return {
        modifiableSavedQueryState: { modifiable, deletable, inputName, inputQuery },
        setModifiableSavedQueryState
    };
};

export default useModifiableSavedQueryState;
