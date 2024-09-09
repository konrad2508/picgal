import React from 'react';
import AppContext from '../../context/AppContext';

const useDuplicatesScannerState = () => {
    const { config, onStartScanning } = React.useContext(AppContext);

    const usedContextValue = {
        config,
        onStartScanning
    };

    return {
        usedContextValue
    };
};

export default useDuplicatesScannerState;
