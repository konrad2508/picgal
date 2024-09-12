import styles from './DuplicatesScanner.module.css';
import React from 'react';
import useDuplicatesScannerState from './useDuplicatesScannerState';

const DuplicatesScanner = () => {
    const { usedContextValue } = useDuplicatesScannerState();

    const onPressScan = () => {
        const directoryToScan = document.getElementById('scanDir').value;

        usedContextValue.onStartScanning(directoryToScan, usedContextValue.config.imageSaveDir);
    };

    return (
        <div className={styles.container}>
            <h3>Duplicates Scanner</h3>
            <div className={styles.params}>
                <div className={styles.paramContainer}>
                    <h4 className={styles.paramTitle}>Directory to scan:</h4>
                    <input id='scanDir' type="text" className={styles.paramValue}/>
                </div>
            </div>
            <button onClick={onPressScan} className={styles.button}>Scan</button>
        </div>
    );
};

export default DuplicatesScanner;
