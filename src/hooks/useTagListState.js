import React from 'react';
import AppContext from '../components/context/AppContext';
import TagListsContext from '../components/context/TagListsContext';

const useTagListState = () => {
    const { appState, config } = React.useContext(AppContext);
    const { modificationMode } = React.useContext(TagListsContext);

    const usedContextValue = {
        appState,
        config,
        modificationMode
    };

    return {
        usedContextValue
    };
};

export default useTagListState;
