import React from 'react';
import AppContext from '../../context/AppContext';

const useDuplicatesScannerToolState = () => {
    const { onStartDuplicatesScanner } = React.useContext(AppContext);

    const usedContextValue = {
        onStartDuplicatesScanner
    };

    return {
        usedContextValue
    };
};

export default useDuplicatesScannerToolState;
