import styles from './MultiselectCount.module.css';
import React from 'react';
import useMultiselectCountState from './useMultiselectCountState';

const MultiselectCount = () => {
    const { usedContextValue } = useMultiselectCountState();

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Selected</h3>
            <p className={styles.value}>{usedContextValue.multiselectSelected.length}</p>
        </div>
    );
};

export default MultiselectCount;
