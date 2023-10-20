import React from 'react';
import AppContext from '../components/context/AppContext';

const useTitleState = () => {
    const { onClickTitle, appState } = React.useContext(AppContext);

    const usedContextValue = {
        onClickTitle,
        appState
    };

    return {
        usedContextValue
    };
};

export default useTitleState;
