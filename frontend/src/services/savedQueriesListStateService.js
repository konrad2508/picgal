const savedQueriesListStateService = ({ setDisplaySavedQueries, setModificatonMode }) => {
    const executeSavedQueryCommand = (savedQuery, onClickSavedQuery) => {
        setDisplaySavedQueries(false);
        onClickSavedQuery(savedQuery);
    };

    const toggleDisplaySavedQueriesCommand = (displaySavedQueries) => {
        setDisplaySavedQueries(!displaySavedQueries);
    };

    const enterModificationModeCommand = () => {
        setModificatonMode(true);
    };

    const exitModificationModeCommand = () => {
        setModificatonMode(false);
    };

    return {
        executeSavedQueryCommand,
        toggleDisplaySavedQueriesCommand,
        enterModificationModeCommand,
        exitModificationModeCommand
    };
};

export default savedQueriesListStateService;
