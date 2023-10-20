import React from 'react';
import AppContext from '../components/context/AppContext';

const useToolsSelectionState = () => {
    const { onSyncDatabase, onStartBatchEditor, onStartSettings } = React.useContext(AppContext);

    const usedContextValue = {
        onSyncDatabase,
        onStartBatchEditor,
        onStartSettings
    };

    return {
        usedContextValue
    };
};

export default useToolsSelectionState;
