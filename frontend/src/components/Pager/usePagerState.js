import React from 'react';
import AppContext from '../../context/AppContext';

const usePagerState = () => {
    const { appState, pageNumber, maxPage, onPageNavClick, onPageNavClickInBatchEditor } = React.useContext(AppContext);

    const [ pagerValue, setPagerValue ] = React.useState(pageNumber);

    const onPagerValueChange = (v) => setPagerValue(v);

    const contextValue = {
        pagerValue,
        onPagerValueChange
    };

    const usedContextValue = {
        appState,
        pageNumber,
        maxPage,
        onPageNavClick,
        onPageNavClickInBatchEditor
    };

    return {
        contextValue,
        usedContextValue
    };
};

export default usePagerState;
