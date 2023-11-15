import React from 'react';
import AppContext from '../../context/AppContext';

const useToolsSelectionState = () => {
    const { onSyncDatabase, onStartBatchEditor, onStartSettings, onStartEncryptor } = React.useContext(AppContext);

    const usedContextValue = {
        onSyncDatabase,
        onStartBatchEditor,
        onStartSettings,
        onStartEncryptor
    };

    return {
        usedContextValue
    };
};

export default useToolsSelectionState;
