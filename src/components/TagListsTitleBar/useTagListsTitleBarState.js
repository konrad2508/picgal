import React from 'react';
import AppContext from '../../context/AppContext';
import TagListsContext from '../../context/TagListsContext';

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
