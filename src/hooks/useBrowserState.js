import React from 'react';
import AppContext from '../components/context/AppContext';

const useBrowserState = () => {
    const { imagesToShow } = React.useContext(AppContext);

    const usedContextValue = {
        imagesToShow
    };

    return {
        usedContextValue
    };
};

export default useBrowserState;
