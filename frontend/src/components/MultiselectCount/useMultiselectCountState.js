import React from 'react';
import AppContext from '../../context/AppContext';

const useMultiselectCountState = () => {
    const { multiselectSelected } = React.useContext(AppContext);

    const usedContextValue = {
        multiselectSelected
    };

    return {
        usedContextValue
    };
};

export default useMultiselectCountState;
