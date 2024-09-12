import React from 'react';
import AppContext from '../../context/AppContext';

const useDuplicatesScannerState = () => {
    const { onStartScanning } = React.useContext(AppContext);

    const usedContextValue = {
        onStartScanning
    };

    return {
        usedContextValue
    };
};

export default useDuplicatesScannerState;
