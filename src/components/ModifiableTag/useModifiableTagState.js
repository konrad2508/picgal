import React from 'react';
import ModifiableTagListContext from '../../context/ModifiableTagListContext';

const useModifiableTagState = () => {
    const { tagListState, onRemoveTag, onCancelModification } = React.useContext(ModifiableTagListContext);

    const usedContextValue = {
        tagListState,
        onRemoveTag,
        onCancelModification
    };

    return {
        usedContextValue
    };
};

export default useModifiableTagState;
