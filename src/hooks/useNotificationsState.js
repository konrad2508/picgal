import React from 'react';
import AppContext from '../components/context/AppContext';

const useNotificationsState = () => {
    const { deletedCounter, restoredPreviewsCounter, restoredSamplesCounter, addCounter } = React.useContext(AppContext);

    const usedContextValue = {
        deletedCounter,
        restoredPreviewsCounter,
        restoredSamplesCounter,
        addCounter
    };

    return {
        usedContextValue
    };
};

export default useNotificationsState;