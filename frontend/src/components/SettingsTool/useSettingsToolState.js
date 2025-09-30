import React from 'react';
import AppContext from '../../context/AppContext';

const useSettingsToolState = () => {
    const { onStartSettings } = React.useContext(AppContext);

    const usedContextValue = {
        onStartSettings
    };

    return {
        usedContextValue
    };
};

export default useSettingsToolState;
