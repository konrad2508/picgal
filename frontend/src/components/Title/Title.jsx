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
        <div className={styles.box}>
            <h1 className={styles.title} onClick={onClick}>Picgal</h1>
        </div>
    );
};

export default Title;
