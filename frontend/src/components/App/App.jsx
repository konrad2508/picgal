import styles from './App.module.css';
import React from 'react';
import Menu from '../Menu/Menu';
import Content from '../Content/Content';
import useAppState from './useAppState';
import AppContext from '../../context/AppContext';

const App = () => {
    const { contextValue } = useAppState();

    return (
        <>
            <AppContext.Provider value={contextValue}>
                <div className={styles.app}>
                    <Menu/>
                    <Content/>
                </div>
            </AppContext.Provider>
        </>
    );
};

export default App;
