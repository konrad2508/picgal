import React from 'react';
import AppContext from '../../context/AppContext';

const useSearchBarState = () => {
    const {
        sendQuery,
        sendQueryInMultiselect,
        onBackClick,
        onCancelMultiselect,
        appState,
        query,
        handleQueryChange,
        existingTags,
        historyLength
    } = React.useContext(AppContext);

    const usedContextValue = {
        sendQuery,
        sendQueryInMultiselect,
        onBackClick,
        onCancelMultiselect,
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
