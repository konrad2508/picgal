import React from 'react';
import AppContext from '../../context/AppContext';

const useToolsSelectionState = () => {
    const { onSyncDatabase, onStartDuplicatesScanner, onStartBatchTagEditor, onStartSettings, onStartEncryptor } = React.useContext(AppContext);

    const usedContextValue = {
        onSyncDatabase,
        onStartDuplicatesScanner,
        onStartBatchTagEditor,
        onStartSettings,
        onStartEncryptor
    };

    return {
        usedContextValue
    };
};

export default useToolsSelectionState;
