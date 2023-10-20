import React from 'react';
import AppContext from '../components/context/AppContext';

const useContentState = () => {
    const { imagesToShow, appState, batchEditorSelected } = React.useContext(AppContext);

    const usedContextValue = {
        imagesToShow,
        appState,
        batchEditorSelected
    };

    return {
        usedContextValue
    };
};

export default useContentState;
