import styles from '../styles/ToolsSelection.module.css'
import React from 'react';
import AppContext from './context/AppContext';

const ToolsSelection = () => {
    const { onSyncDatabase } = React.useContext(AppContext);

    return (
        <div className={styles.container}>
            <h1>Tools</h1>
            <div className={styles.buttonContainer}>
                <button onClick={onSyncDatabase} className={styles.button}>Sync Database</button>
            </div>
        </div>
    );
};

export default ToolsSelection;
