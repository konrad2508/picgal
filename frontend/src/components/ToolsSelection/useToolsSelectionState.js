import React from 'react';
import AppContext from '../../context/AppContext';

const useToolsSelectionState = () => {
    const { onSyncDatabase, onStartBatchTagEditor, onStartSettings, onStartEncryptor } = React.useContext(AppContext);

    const usedContextValue = {
        onSyncDatabase,
        onStartBatchTagEditor,
        onStartSettings,
        onStartEncryptor
    };

    return {
        usedContextValue
    };
};

export default useToolsSelectionState;
