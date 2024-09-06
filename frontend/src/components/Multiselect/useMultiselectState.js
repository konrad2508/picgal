import React from 'react';
import AppContext from '../../context/AppContext';

const useMultiselectState = () => {
    const { imagesToShow, multiselectSelected } = React.useContext(AppContext);

    const usedContextValue = {
        imagesToShow,
        multiselectSelected
    };

    return {
        usedContextValue
    };
};

export default useMultiselectState;
