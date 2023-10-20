import React from 'react';
import AppContext from '../components/context/AppContext';
import TagListsContext from '../components/context/TagListsContext';

const useTagListsTitleBarState = () => {
    const { appState } = React.useContext(AppContext);
    const { modificationMode, changeModificationMode, changeModificationModeInBatchEditor } = React.useContext(TagListsContext);

    const usedContextValue = {
        appState,
        modificationMode,
        changeModificationMode,
        changeModificationModeInBatchEditor
    };

    return {
        usedContextValue
    };
};

export default useTagListsTitleBarState;
