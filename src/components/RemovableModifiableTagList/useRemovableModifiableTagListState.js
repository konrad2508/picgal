import React from 'react';
import ModifiableTagListContext from '../../context/ModifiableTagListContext';
import AppContext from '../../context/AppContext';

const useRemovableModifiableTagListState = () => {
    const { config } = React.useContext(AppContext);
    const { tagList, switchStateNormal } = React.useContext(ModifiableTagListContext);

    const usedContextValue = {
        config,
        tagList,
        switchStateNormal
    };

    return {
        usedContextValue
    };
};

export default useRemovableModifiableTagListState;
