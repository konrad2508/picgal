import React from 'react';
import AppContext from '../../context/AppContext';

const useImagePreviewState = () => {
    const { onImagePreviewClick, onClickPreviewInMultiselect } = React.useContext(AppContext);

    const usedContextValue = {
        onImagePreviewClick,
        onClickPreviewInMultiselect
    };

    return {
        usedContextValue
    };
};

export default useImagePreviewState;
