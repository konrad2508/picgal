import React from 'react';
import ModifiableTagListContext from '../components/context/ModifiableTagListContext';
import AppContext from '../components/context/AppContext';

const useCancelableModifiableTagListState = () => {
    const { config } = React.useContext(AppContext);
    const { tagList, switchStateAdd, switchStateRemove } = React.useContext(ModifiableTagListContext);

    const usedContextValue = {
        config,
        tagList,
        switchStateAdd,
        switchStateRemove
    };

    return {
        usedContextValue
    };
};

export default useCancelableModifiableTagListState;
