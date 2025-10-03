import styles from './Title.module.css';
import React from 'react';
import AppState from '../../enums/AppState';
import useTitleState from './useTitleState';

const Title = () => {
    const { usedContextValue } = useTitleState();

    const isActive = () => usedContextValue.appState !== AppState.START && !AppState.isMultiselect(usedContextValue.appState);

    const onClick = () => {
        if (isActive()) {
            usedContextValue.onClickTitle();
        }
    };

    return (
        <div className={styles.center} >
            <h1
                className={styles.title}
                onClick={onClick}
                style={{cursor: isActive() ? 'pointer' : 'default'}}
            >
                Picgal
            </h1>
        </div>
    );
};

export default Title;
