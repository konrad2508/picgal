import React from 'react';
import AppContext from '../../context/AppContext';

const useMetadataState = () => {
    const { showOriginal, onToggleShowOriginal, onSaveModifiedTagsClick } = React.useContext(AppContext);

    const usedContextValue = {
        showOriginal,
        onToggleShowOriginal,
        onSaveModifiedTagsClick
    };

    return {
        usedContextValue
    };
};

export default useMetadataState;
