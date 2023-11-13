import React from 'react';
import AppContext from '../components/context/AppContext';

const useViewEncryptedState = () => {
    const { viewEncrypted, onClickViewEncrypted } = React.useContext(AppContext);

    const usedContextValue = {
        viewEncrypted,
        onClickViewEncrypted
    };

    return {
        usedContextValue
    };
};

export default useViewEncryptedState;
