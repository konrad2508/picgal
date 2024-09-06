import React from 'react';
import AppContext from '../../context/AppContext';
import TagListsContext from '../../context/TagListsContext';

const useTagListsTitleBarState = () => {
    const { appState } = React.useContext(AppContext);
    const { modificationMode, changeModificationMode, changeModificationModeInBatchTagEditor } = React.useContext(TagListsContext);

    const usedContextValue = {
        appState,
        modificationMode,
        changeModificationMode,
        changeModificationModeInBatchTagEditor
    };

    return {
        usedContextValue
    };
};

export default useTagListsTitleBarState;
