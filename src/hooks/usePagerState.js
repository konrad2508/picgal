import React from 'react';
import AppContext from '../components/context/AppContext';

const usePagerState = () => {
    const { appState, pageNumber, maxPage, onPageNavClick, onPageNavClickInBatchEditor } = React.useContext(AppContext);

    const usedContextValue = {
        appState,
        pageNumber,
        maxPage,
        onPageNavClick,
        onPageNavClickInBatchEditor
    };

    return {
        usedContextValue
    };
};

export default usePagerState;
