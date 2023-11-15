import styles from './App.module.css';
import React from 'react';
import Title from '../Title/Title';
import Menu from '../Menu/Menu';
import Content from '../Content/Content';
import useAppState from './useAppState';
import AppContext from '../../context/AppContext';

const App = () => {
    const { contextValue } = useAppState();

    return (
        <div className={styles.main}>
            <AppContext.Provider value={contextValue}>
                <Title/>
                <div className={styles.app}>
                    <Menu/>
                    <Content/>
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default App;
