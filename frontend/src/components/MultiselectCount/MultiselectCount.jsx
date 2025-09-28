import styles from './MultiselectCount.module.css';
import React from 'react';
import useMultiselectCountState from './useMultiselectCountState';

const MultiselectCount = () => {
    const { usedContextValue } = useMultiselectCountState();

    return (
        <div className={styles.container}>
            <h3>Selected: {usedContextValue.multiselectSelected.length}</h3>
        </div>
    );
};

export default MultiselectCount;
