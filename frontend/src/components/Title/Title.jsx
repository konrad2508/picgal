import styles from './Title.module.css';
import React from 'react';
import AppState from '../../enums/AppState';
import useTitleState from './useTitleState';

const Title = () => {
    const { usedContextValue } = useTitleState();

    const onClick = () => {
        if (usedContextValue.appState !== AppState.START && !AppState.isMultiselect(usedContextValue.appState)) {
            usedContextValue.onClickTitle();
        }
    };

    return (
        <>
            <h1 className={styles.title} onClick={onClick}>Picgal</h1>
        </>
    );
};

export default Title;
