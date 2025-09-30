import React from 'react';
import AppContext from '../../context/AppContext';

const useBatchTagEditorToolState = () => {
    const { onStartBatchTagEditor } = React.useContext(AppContext);

    const usedContextValue = {
        onStartBatchTagEditor
    };

    return {
        usedContextValue
    };
};

export default useBatchTagEditorToolState;
