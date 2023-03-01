import React from 'react';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const Title = () => {
    const { onClickTitle, appState } = React.useContext(AppContext);

    const onClick = () => {
        if (appState !== AppState.BATCH_EDITING && appState !== AppState.START) {
            onClickTitle();
        }
    };

    return (
        <h1 onClick={onClick}>Picgal</h1>
    );
};

export default Title;
