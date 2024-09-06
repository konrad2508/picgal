import React from 'react';
import AppContext from '../../context/AppContext';

const usePagerState = () => {
    const { appState, pageNumber, maxPage, onPageNavClick, onPageNavClickInMultiselect } = React.useContext(AppContext);

    const usedContextValue = {
        appState,
        pageNumber,
        maxPage,
        onPageNavClick,
        onPageNavClickInMultiselect
    };

    return {
        usedContextValue
    };
};

export default usePagerState;
