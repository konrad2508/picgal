import React from 'react';
import AppContext from '../../context/AppContext';

const useEncryptState = () => {
    const { onClickEncrypt } = React.useContext(AppContext);

    const usedContextValue = {
        onClickEncrypt
    };

    return {
        usedContextValue
    };
};

export default useEncryptState;
