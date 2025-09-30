import React from 'react';
import AppContext from '../../context/AppContext';

const useEncryptorToolState = () => {
    const { onStartEncryptor } = React.useContext(AppContext);

    const usedContextValue = {
        onStartEncryptor
    };

    return {
        usedContextValue
    };
};

export default useEncryptorToolState;
