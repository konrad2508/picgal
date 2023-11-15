import React from 'react';
import AppContext from '../../context/AppContext';
import TagListsContext from '../../context/TagListsContext';

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
