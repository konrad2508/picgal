import React from 'react';
import AppContext from '../../context/AppContext';

const useBatchSelectState = () => {
    const { imagesToShow, batchEditorSelected } = React.useContext(AppContext);

    const usedContextValue = {
        imagesToShow,
        batchEditorSelected
    };

    return {
        usedContextValue
    };
};

export default useBatchSelectState;
