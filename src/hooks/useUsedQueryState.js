import React from 'react';
import AppContext from '../components/context/AppContext';

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
