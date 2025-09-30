import styles from './BatchTagEditorTool.module.css';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import useBatchTagEditorToolState from './useBatchTagEditorToolState';

const BatchTagEditorTool = () => {
    const { usedContextValue } = useBatchTagEditorToolState();

    return (
        <button onClick={usedContextValue.onStartBatchTagEditor} className={styles.button}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FaEdit size={30}/>
                </div>
                <div className={styles.description}>
                    <h4>Batch Tag Editor</h4>
                    <p>
                        Add tags to one or more images at the same time.
                        Select images you want to modify by clicking on them in the browser, then specify tags you wish to add in the menu panel.
                    </p>
                </div>
            </div>
        </button>
    );
};

export default BatchTagEditorTool;