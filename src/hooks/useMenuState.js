import React from 'react';
import AppContext from '../components/context/AppContext';

const useMenuState = () => {
    const { appState, imagesToShow } = React.useContext(AppContext);

    const usedContextValue = {
        appState,
        imagesToShow
    };

    return {
        usedContextValue
    };
};

export default useMenuState;
