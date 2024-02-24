import React from 'react';
import AppContext from '../../context/AppContext';

const useCountState = () => {
    const { imagesCounter } = React.useContext(AppContext);

    const usedContextValue = {
        imagesCounter
    };

    return {
        usedContextValue
    };
};

export default useCountState;
