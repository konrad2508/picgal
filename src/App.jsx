import './styles/main.css';
import styles from './styles/App.module.css';
import React from 'react';
import Title from './components/Title';
import Menu from './components/Menu';
import Content from './components/Content';
import useAppState from './hooks/useAppState';
import AppContext from './components/context/AppContext';

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
