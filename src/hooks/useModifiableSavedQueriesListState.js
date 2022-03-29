import React from 'react';
import ModifiableSavedQueriesListCommand from '../enums/ModifiableSavedQueriesListCommand';
import modifiableSavedQueriesListStateService from '../services/modifiableSavedQueriesListStateService';

const useModifiableSavedQueriesListState = () => {
    const [ addingSavedQuery, setAddingSavedQuery ] = React.useState(false);
    const [ inputNewName, setInputNewName ] = React.useState('');
    const [ inputNewQuery, setInputNewQuery ] = React.useState('');

    const hookService = modifiableSavedQueriesListStateService({ setAddingSavedQuery, setInputNewName, setInputNewQuery });

    const setModifiableSavedQueriesListState = (command, args) => {
        switch (command) {
            case ModifiableSavedQueriesListCommand.START_ADDING_SAVED_QUERY: {
                hookService.startAddingSavedQueryCommand();

                break;
            }

            case ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_NAME: {
                const { event } = args;

                hookService.handleInputNewNameCommand(event);

                break;
            }

            case ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_QUERY: {
                const { event } = args;

                hookService.handleInputNewQueryCommand(event);

                break;
            }

            case ModifiableSavedQueriesListCommand.ADD_SAVED_QUERY: {
                const { canUseSavedQueryName, onAddSavedQuery } = args;

                hookService.addSavedQueryCommand(canUseSavedQueryName, inputNewName, inputNewQuery, onAddSavedQuery);

                break;
            }

            case ModifiableSavedQueriesListCommand.CANCEL_ADDING_SAVED_QUERY: {
                hookService.cancelAddingSavedQueryCommand();

                break;
            }

            default: { }
        }
    };

    return {
        modifiableSavedQueriesListState: { addingSavedQuery, inputNewName, inputNewQuery },
        setModifiableSavedQueriesListState
    };
};

export default useModifiableSavedQueriesListState;
