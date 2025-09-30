import styles from './SyncDatabaseTool.module.css';
import React from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import useSyncDatabaseToolState from './useSyncDatabaseToolState';

const SyncDatabaseTool = () => {
    const { usedContextValue } = useSyncDatabaseToolState();

    return (
        <button onClick={usedContextValue.onSyncDatabase} className={styles.button}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FaArrowsRotate size={30}/>
                </div>
                <div className={styles.description}>
                    <h4>Sync Database</h4>
                    <p>
                        Synchronize the database with your gallery.
                        That includes creating a database if it doesn&apos;t exist yet, adding and removing images,
                        and making sure the database is in the correct state.
                    </p>
                </div>
            </div>
        </button>
    );
};

export default SyncDatabaseTool;