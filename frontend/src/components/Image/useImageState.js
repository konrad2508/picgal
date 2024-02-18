import React from 'react';
import AppContext from '../../context/AppContext';

const useImageState = () => {
    const { showOriginal } = React.useContext(AppContext);

    const usedContextValue = {
        showOriginal
    };

    return {
        usedContextValue
    };
};

export default useImageState;
