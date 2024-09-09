import React from 'react';
import AppContext from '../../context/AppContext';

const useNotificationsState = () => {
    const {
        deletedCounter,
        restoredPreviewsCounter,
        restoredSamplesCounter,
        addCounter,
        downloadedFilePath,
        scanReportFilePath
    } = React.useContext(AppContext);

    const usedContextValue = {
        deletedCounter,
        restoredPreviewsCounter,
        restoredSamplesCounter,
        addCounter,
        downloadedFilePath,
        scanReportFilePath
    };

    return {
        usedContextValue
    };
};

export default useNotificationsState;