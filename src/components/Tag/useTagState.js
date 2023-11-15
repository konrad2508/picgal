import React from 'react';
import AppContext from '../../context/AppContext';

const useTagState = () => {
    const { onClickTag } = React.useContext(AppContext);

    const usedContextValue = {
        onClickTag
    };

    return {
        usedContextValue
    };
};

export default useTagState;
