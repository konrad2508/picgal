import React from 'react';
import ModificationMode from '../enums/ModificationMode';
import modificationForm from '../forms/modificationForm';
import TagListsCommand from '../enums/TagListsCommand';

const useTagListsState = () => {
    const { form: modificationsForm, formComplements } = modificationForm();

    const [ modifications, setModifications ] = React.useState(modificationsForm);
    const [ modificationMode, setModificationMode ] = React.useState(false);

    const setTagListsState = (command, args) => {
        switch (command) {
            case TagListsCommand.ADD_MODIFICATION: {
                const { op, element } = args;

                const newModifications = {...modifications};
                const complementaryOp = formComplements[op];

                if (newModifications[complementaryOp].includes(element)) {
                    newModifications[complementaryOp] = newModifications[complementaryOp].filter(e => e !== element);
                }
                else {
                    newModifications[op].push(element);
                }

                setModifications(newModifications);

                break;
            }

            case TagListsCommand.SWITCH_MODE: {
                const { id, onSaveModifiedTagsClick, mode } = args;

                if (mode === ModificationMode.START) {
                    setModificationMode(true);
                }
                else if (mode === ModificationMode.CANCEL) {
                    setModificationMode(false);
                    setModifications({...modificationsForm});
                }
                else if (mode === ModificationMode.SEND) {
                    onSaveModifiedTagsClick(id, modifications);

                    setModificationMode(false);
                    setModifications({...modificationsForm});
                }

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
