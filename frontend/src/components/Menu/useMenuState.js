import React from 'react';
import AppContext from '../../context/AppContext';

const useMenuState = () => {
    const { appState, imagesToShow, multiselectSelected, onClickViewEncrypted } = React.useContext(AppContext);

    const usedContextValue = {
        appState,
        imagesToShow,
        multiselectSelected,
        onClickViewEncrypted
    };

    return {
        usedContextValue
    };
};

export default useMenuState;
