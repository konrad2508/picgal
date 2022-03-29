import ModificationMode from '../enums/ModificationMode';

const tagListsStateService = ({ setModifications, setModificationMode }) => {
    const addModificationCommand = (modifications, op, element, formComplements) => {
        const newModifications = {...modifications};
        const complementaryOp = formComplements[op];

        if (newModifications[complementaryOp].includes(element)) {
            newModifications[complementaryOp] = newModifications[complementaryOp].filter(e => e !== element);
        }
        else {
            newModifications[op].push(element);
        }

        setModifications(newModifications);
    };

    const switchModeCommand = (mode, id, modifications, onSaveModifiedTagsClick, modificationsForm) => {
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
    };

    return {
        addModificationCommand,
        switchModeCommand
    }
};

export default tagListsStateService;
