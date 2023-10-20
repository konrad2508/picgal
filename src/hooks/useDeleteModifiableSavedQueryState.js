import React from 'react';
import ModifiableSavedQueryContext from '../components/context/ModifiableSavedQueryContext';
import AppContext from '../components/context/AppContext';

const useDeleteModifiableSavedQueryState = () => {
    const { onDeleteSavedQuery } = React.useContext(AppContext);
    const { disableDeletable } = React.useContext(ModifiableSavedQueryContext);

    const usedContextValue = {
        onDeleteSavedQuery,
        disableDeletable
    };

    return {
        usedContextValue
    }
};

export default useDeleteModifiableSavedQueryState;
