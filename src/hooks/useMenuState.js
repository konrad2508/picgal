import React from 'react';
import AppContext from '../components/context/AppContext';

const useMenuState = () => {
    const { appState, imagesToShow, onClickViewEncrypted } = React.useContext(AppContext);

    const usedContextValue = {
        appState,
        imagesToShow,
        onClickViewEncrypted
    };

    return {
        usedContextValue
    };
};

export default useMenuState;