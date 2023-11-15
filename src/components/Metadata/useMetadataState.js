import React from 'react';
import AppContext from '../../context/AppContext';

const useMetadataState = () => {
    const { onSaveModifiedTagsClick } = React.useContext(AppContext);

    const usedContextValue = {
        onSaveModifiedTagsClick
    };

    return {
        usedContextValue
    };
};

export default useMetadataState;
