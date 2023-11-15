import React from 'react';
import ModifiableTagListContext from '../../context/ModifiableTagListContext';
import AppContext from '../../context/AppContext';

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
