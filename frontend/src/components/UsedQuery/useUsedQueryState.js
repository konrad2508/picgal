import React from 'react';
import AppContext from '../../context/AppContext';

const useUsedQueryState = () => {
    const { usedQuery } = React.useContext(AppContext);

    const usedContextValue = {
        usedQuery
    };

    return {
        usedContextValue
    };
};

export default useUsedQueryState;
