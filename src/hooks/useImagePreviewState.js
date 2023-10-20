import React from 'react';
import AppContext from '../components/context/AppContext';

const useImagePreviewState = () => {
    const { onImagePreviewClick, onClickPreviewInBatchEditor } = React.useContext(AppContext);

    const usedContextValue = {
        onImagePreviewClick,
        onClickPreviewInBatchEditor
    };

    return {
        usedContextValue
    };
};

export default useImagePreviewState;
