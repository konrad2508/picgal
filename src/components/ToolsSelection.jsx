import styles from '../styles/ToolsSelection.module.css'
import React from 'react';
import AppContext from './context/AppContext';

const ToolsSelection = () => {
    const { onSyncDatabase } = React.useContext(AppContext);

    return (
        <div className={styles.container}>
            <div className={styles.outside}>
                <h1>Tools</h1>
                <button onClick={onSyncDatabase}>Sync Database</button>
                <button>tool2</button>
                <button>tool3</button>
            </div>
        </div>
    );
};

export default ToolsSelection;
