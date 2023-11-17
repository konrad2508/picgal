import React from 'react';

const useEncryptState = () => {
    const [ showOriginal, setShowOriginal ] = React.useState(false);

    const toggleShowOriginal = () => setShowOriginal(!showOriginal);
    
    const contextValue = {
        showOriginal,
        toggleShowOriginal
    };

    return {
        contextValue
    };
};

export default useEncryptState;
