const modifiableSavedQueriesListStateService = ({ setAddingSavedQuery, setInputNewName, setInputNewQuery }) => {
    const startAddingSavedQueryCommand = () => {
        setAddingSavedQuery(true);
    };

    const handleInputNewNameCommand = (e) => {
        setInputNewName(e.target.value);
    };

    const handleInputNewQueryCommand = (e) => {
        setInputNewQuery(e.target.value);
    };

    const addSavedQueryCommand = (canUseSavedQueryName, inputNewName, inputNewQuery, onAddSavedQuery) => {
        if (!canUseSavedQueryName(null, inputNewName)) {
            return;
        }

        onAddSavedQuery({ name: inputNewName, query: inputNewQuery.trim() });
        
        setAddingSavedQuery(false);
        setInputNewName('');
        setInputNewQuery('');
    };

    const cancelAddingSavedQueryCommand = () => {
        setAddingSavedQuery(false);
        setInputNewName('');
        setInputNewQuery('');
    };

    return {
        startAddingSavedQueryCommand,
        handleInputNewNameCommand,
        handleInputNewQueryCommand,
        addSavedQueryCommand,
        cancelAddingSavedQueryCommand
    };
};

export default modifiableSavedQueriesListStateService;
