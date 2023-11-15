import React from 'react';
import AppContext from '../../context/AppContext';

const useViewEncryptedToolState = () => {
    const { viewEncrypted, onClickViewEncrypted } = React.useContext(AppContext);

    const usedContextValue = {
        viewEncrypted,
        onClickViewEncrypted
    };

    return {
        usedContextValue
    };
};

export default useViewEncryptedToolState;
