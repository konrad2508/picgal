import styles from './DuplicatesScanner.module.css';
import React from 'react';
import useDuplicatesScannerState from './useDuplicatesScannerState';

const DuplicatesScanner = () => {
    const { usedContextValue } = useDuplicatesScannerState();

    const onPressScan = () => {
        const baseDirectory = document.getElementById('baseDir').value;
        const directoryToScan = document.getElementById('scanDir').value;

        usedContextValue.onStartScanning(baseDirectory, directoryToScan, usedContextValue.config.saveDir);
    };

    return (
        <div className={styles.center}>
            <div className={styles.box}>
                <div className={styles.center}>
                    <h2>Duplicates Scanner</h2>
                </div>
                <div className={styles.params}>
                    <div className={styles.paramContainer}>
                        <h4 className={styles.paramTitle}>Original directory:</h4>
                        <input id='baseDir' type="text" className={styles.paramValue} placeholder='database'/>
                    </div>
                    <div className={styles.paramContainer}>
                        <h4 className={styles.paramTitle}>Directory to scan:</h4>
                        <input id='scanDir' type="text" className={styles.paramValue}/>
                    </div>
                </div>
                <div className={styles.center}>
                    <button onClick={onPressScan} className={styles.button}>Scan</button>
                </div>
            </div>
        </div>
    );
};

export default DuplicatesScanner;
