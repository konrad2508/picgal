import React from 'react';
import ModifiableSavedQueriesListCommand from '../enums/ModifiableSavedQueriesListCommand';

const useModifiableSavedQueriesListState = () => {
    const [ addingSavedQuery, setAddingSavedQuery ] = React.useState(false);
    const [ inputNewName, setInputNewName ] = React.useState('');
    const [ inputNewQuery, setInputNewQuery ] = React.useState('');

    const setModifiableSavedQueriesListState = (command, args) => {
        switch (command) {
            case ModifiableSavedQueriesListCommand.START_ADDING_SAVED_QUERY: {
                setAddingSavedQuery(true);

                break;
            }

            case ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_NAME: {
                const { event } = args;

                setInputNewName(event.target.value);

                break;
            }

            case ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_QUERY: {
                const { event } = args;

                setInputNewQuery(event.target.value);

                break;
            }

            case ModifiableSavedQueriesListCommand.ADD_SAVED_QUERY: {
                const { canUseSavedQueryName, onAddSavedQuery } = args;

                if (!canUseSavedQueryName(null, inputNewName)) {
                    return;
                }
        
                onAddSavedQuery({ name: inputNewName, query: inputNewQuery.trim() });
                
                setAddingSavedQuery(false);
                setInputNewName('');
                setInputNewQuery('');

                break;
            }

            case ModifiableSavedQueriesListCommand.CANCEL_ADDING_SAVED_QUERY: {
                setAddingSavedQuery(false);
                setInputNewName('');
                setInputNewQuery('');

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
