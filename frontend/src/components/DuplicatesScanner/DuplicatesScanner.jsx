import styles from './DuplicatesScanner.module.css';
import React from 'react';
import useDuplicatesScannerState from './useDuplicatesScannerState';

const DuplicatesScanner = () => {
    const { usedContextValue } = useDuplicatesScannerState();

    const onPressScan = () => {
        const directoryToScan = document.getElementById('scanDir').value;
        const outputDirectory = document.getElementById('outDir').value;

        usedContextValue.onStartScanning(directoryToScan, outputDirectory);
    };

    return (
        <div className={styles.container}>
            <h3>Duplicates Scanner</h3>
            <div className={styles.params}>
                <div className={styles.paramContainer}>
                    <h4 className={styles.paramTitle}>Directory to scan:</h4>
                    <input id='scanDir' type="text" className={styles.paramValue}/>
                </div>
                <div className={styles.paramContainer}>
                    <h4 className={styles.paramTitle}>Report location:</h4>
                    <input id='outDir' type="text" defaultValue={usedContextValue.config.imageSaveDir} className={styles.paramValue}/>
                </div>
            </div>
            <button onClick={onPressScan} className={styles.button}>Scan</button>
        </div>
    );
};

export default DuplicatesScanner;
