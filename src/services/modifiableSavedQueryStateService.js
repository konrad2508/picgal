const modifiableSavedQueryStateService = ({ setModifiable, setDeletable, setInputName, setInputQuery }) => {
    const handleInputNameChangeCommand = (e) => {
        setInputName(e.target.value);
    };

    const handleInputQueryChangeCommand = (e) => {
        setInputQuery(e.target.value);
    };

    const modifyQueryCommand = (canUseSavedQueryName, savedQueryId, inputName, onModifySavedQuery, inputQuery) => {
        if (!canUseSavedQueryName(savedQueryId, inputName)) {
            return;
        }

        setModifiable(false);
        onModifySavedQuery(savedQueryId, { name: inputName, query: inputQuery.trim() });
    };

    const cancelModifyCommand = (savedQuery) => {
        setModifiable(false);
        setInputName(savedQuery.name);
        setInputQuery(savedQuery.query);
    };

    const enableDeletableCommand = () => {
        setDeletable(true);
    };

    const disableDeletableCommand = () => {
        setDeletable(false);
    };

    const enableModifiableCommand = () => {
        setModifiable(true);
    };

    return {
        handleInputNameChangeCommand,
        handleInputQueryChangeCommand,
        modifyQueryCommand,
        cancelModifyCommand,
        enableDeletableCommand,
        disableDeletableCommand,
        enableModifiableCommand
    }
};

export default modifiableSavedQueryStateService;
