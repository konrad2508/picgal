import React from 'react';
import AppContext from '../../context/AppContext';

const useContentState = () => {
    const { imagesToShow, appState, viewEncrypted, batchEditorSelected } = React.useContext(AppContext);

    const usedContextValue = {
        imagesToShow,
        appState,
        viewEncrypted,
        batchEditorSelected
    };

    return {
        usedContextValue
    };
};

export default useContentState;
