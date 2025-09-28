import React from 'react';
import AppContext from '../../context/AppContext';

const useMultiselectState = () => {
    const { appState, imagesToShow, multiselectSelected } = React.useContext(AppContext);

    const usedContextValue = {
        appState,
        imagesToShow,
        multiselectSelected
    };

    return {
        usedContextValue
    };
};

export default useMultiselectState;
