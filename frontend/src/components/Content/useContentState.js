import React from 'react';
import AppContext from '../../context/AppContext';

const useContentState = () => {
    const { imagesToShow, appState } = React.useContext(AppContext);

    const usedContextValue = {
        imagesToShow,
        appState
    };

    return {
        usedContextValue
    };
};

export default useContentState;
