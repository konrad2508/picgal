import React from 'react';
import AppContext from '../../context/AppContext';

const useSyncDatabaseToolState = () => {
    const { onSyncDatabase } = React.useContext(AppContext);

    const usedContextValue = { 
        onSyncDatabase
    };

    return {
        usedContextValue
    };
};

export default useSyncDatabaseToolState;
