import React from 'react';
import AppContext from '../../context/AppContext';

const useSearchBarState = () => {
    const {
        sendQuery,
        sendQueryInBatchEditor,
        onBackClick,
        onCancelBatchEditor,
        appState,
        query,
        handleQueryChange,
        existingTags,
        historyLength
    } = React.useContext(AppContext);

    const usedContextValue = {
        sendQuery,
        sendQueryInBatchEditor,
        onBackClick,
        onCancelBatchEditor,
        appState,
        query,
        handleQueryChange,
        existingTags,
        historyLength
    };

    return {
        usedContextValue
    };
};

export default useSearchBarState;
