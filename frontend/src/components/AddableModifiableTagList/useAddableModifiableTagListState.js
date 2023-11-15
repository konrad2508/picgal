import React from 'react';
import ModifiableTagListContext from '../../context/ModifiableTagListContext';
import AppContext from '../../context/AppContext';

const useAddableModifiableTagListState = () => {
    const { config } = React.useContext(AppContext);
    const { tagList, switchStateNormal, onAddTag } = React.useContext(ModifiableTagListContext);

    const usedContextValue = {
        config,
        tagList,
        switchStateNormal,
        onAddTag
    };

    return {
        usedContextValue
    };
};

export default useAddableModifiableTagListState;
