import React from 'react';
import AppContext from '../../context/AppContext';

const useSettingsState = () => {
    const { config, onSaveSettings } = React.useContext(AppContext);

    const usedContextValue = {
        config,
        onSaveSettings
    };

    return {
        usedContextValue
    };
};

export default useSettingsState;
