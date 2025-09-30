import styles from './Count.module.css';
import React from 'react';
import useCountState from './useCountState';

const Count = () => {
    const { usedContextValue } = useCountState();

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Count</h3>
            <p className={styles.value}>{usedContextValue.imagesCounter}</p>
        </div>
    );
};

export default Count;
