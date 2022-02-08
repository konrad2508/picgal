import React from 'react';
import ModifiableSavedQueryCommand from '../enums/ModifiableSavedQueryCommand';

const useModifiableSavedQueryState = (savedQuery) => {
    const [ modifiable, setModifiable ] = React.useState(false);
    const [ deletable, setDeletable ] = React.useState(false);
    const [ inputName, setInputName ] = React.useState(savedQuery.name);
    const [ inputQuery, setInputQuery ] = React.useState(savedQuery.query);

    const setModifiableSavedQueryState = (command, args) => {
        switch (command) {
            case ModifiableSavedQueryCommand.HANDLE_INPUT_NAME_CHANGE: {
                const { event } = args;

                setInputName(event.target.value);

                break;
            }

            case ModifiableSavedQueryCommand.HANDLE_INPUT_QUERY_CHANGE: {
                const { event } = args;

                setInputQuery(event.target.value);

                break;
            }

            case ModifiableSavedQueryCommand.MODIFY_QUERY: {
                const { canUseSavedQueryName, onModifySavedQuery } = args;

                if (!canUseSavedQueryName(savedQuery.id, inputName)) {
                    return;
                }
        
                setModifiable(false);
                onModifySavedQuery(savedQuery.id, { name: inputName, query: inputQuery.trim() });

                break;
            }

            case ModifiableSavedQueryCommand.CANCEL_MODIFY: {
                setModifiable(false);
                setInputName(savedQuery.name);
                setInputQuery(savedQuery.query);

                break;
            }

            case ModifiableSavedQueryCommand.ENABLE_DELETABLE: {
                setDeletable(true);

                break;
            }

            case ModifiableSavedQueryCommand.DISABLE_DELETABLE: {
                setDeletable(false);

                break;
            }

            case ModifiableSavedQueryCommand.ENABLE_MODIFIABLE: {
                setModifiable(true);

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
