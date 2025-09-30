import styles from './DuplicatesScannerTool.module.css';
import React from 'react';
import { FaCopy } from 'react-icons/fa';
import useDuplicatesScannerToolState from './useDuplicatesScannerToolState';

const DuplicatesScannerTool = () => {
    const { usedContextValue } = useDuplicatesScannerToolState();

    return (
        <button onClick={usedContextValue.onStartDuplicatesScanner} className={styles.button}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FaCopy size={30}/>
                </div>
                <div className={styles.description}>
                    <h4>Duplicates Scanner</h4>
                    <p>
                        Scan a directory in search of duplicate images.
                        The directory will be checked to see whether duplicates of a same image can be found there
                        or in the original directory.
                    </p>
                </div>
            </div>
        </button>
    );
};

export default DuplicatesScannerTool;