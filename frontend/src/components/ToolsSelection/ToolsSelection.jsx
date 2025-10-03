import styles from './ToolsSelection.module.css';
import React from 'react';
import SyncDatabaseTool from '../SyncDatabaseTool/SyncDatabaseTool';
import DuplicatesScannerTool from '../DuplicatesScannerTool/DuplicatesScannerTool';
import BatchTagEditorTool from '../BatchTagEditorTool/BatchTagEditorTool';
import SettingsTool from '../SettingsTool/SettingsTool';
import EncryptorTool from '../EncryptorTool/EncryptorTool';
import ViewEncryptedTool from '../ViewEncryptedTool/ViewEncryptedTool';
// import useToolsSelectionState from './useToolsSelectionState';

const ToolsSelection = () => {
    // const {  } = useToolsSelectionState();

    return (
        <div className={styles.center}>
            <div className={styles.box}>
                <div className={styles.center}>
                    <h2>Menu</h2>
                </div>
                <hr/>
                <div className={styles.buttonContainer}>
                    <SyncDatabaseTool/>
                    <DuplicatesScannerTool/>
                    <BatchTagEditorTool/>
                    <SettingsTool/>
                    <EncryptorTool/>
                    <ViewEncryptedTool/>
                </div>
            </div>
        </div>
    );
};

export default ToolsSelection;
