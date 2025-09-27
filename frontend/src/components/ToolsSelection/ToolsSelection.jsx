import styles from './ToolsSelection.module.css';
import React from 'react';
import ViewEncryptedTool from '../ViewEncryptedTool/ViewEncryptedTool';
import useToolsSelectionState from './useToolsSelectionState';

const ToolsSelection = () => {
    const { usedContextValue } = useToolsSelectionState();

    return (
        <div className={styles.center}>
            <div className={styles.box}>
                <div className={styles.center}>
                    <h2>Tools</h2>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={usedContextValue.onSyncDatabase} className={styles.button}>Sync Database</button>
                    <button onClick={usedContextValue.onStartDuplicatesScanner} className={styles.button}>Duplicates Scanner</button>
                    <button onClick={usedContextValue.onStartBatchTagEditor} className={styles.button}>Batch Tag Editor</button>
                    <button onClick={usedContextValue.onStartSettings} className={styles.button}>Settings</button>
                    <button onClick={usedContextValue.onStartEncryptor} className={styles.button}>Encryptor</button>
                    <ViewEncryptedTool style={styles.button}/>
                </div>
            </div>
        </div>
    );
};

export default ToolsSelection;
