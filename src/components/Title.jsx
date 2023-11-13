import React from 'react';
import AppState from '../enums/AppState';
import useTitleState from '../hooks/useTitleState';

const Title = () => {
    const { usedContextValue } = useTitleState();

    const onClick = () => {
        if (usedContextValue.appState !== AppState.BATCH_EDITING
            && usedContextValue.appState !== AppState.START
            && usedContextValue.appState !== AppState.ENCRYPTOR) {
            usedContextValue.onClickTitle();
        }
    };

    return (
        <h1 onClick={onClick}>Picgal</h1>
    );
};

export default Title;
