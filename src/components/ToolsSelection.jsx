import styles from '../styles/ToolsSelection.module.css'
import React from 'react';
import useToolsSelectionState from '../hooks/useToolsSelectionState';

const ToolsSelection = () => {
    const { usedContextValue } = useToolsSelectionState();

    return (
        <div className={styles.container}>
            <h1>Tools</h1>
            <div className={styles.buttonContainer}>
                <button onClick={usedContextValue.onSyncDatabase} className={styles.button}>Sync Database</button>
                <button onClick={usedContextValue.onStartBatchEditor} className={styles.button}>Batch Tag Editor</button>
                <button onClick={usedContextValue.onStartSettings} className={styles.button}>Settings</button>
            </div>
        </div>
    );
};

export default ToolsSelection;
