import styles from './Count.module.css';
import React from 'react';
import useCountState from './useCountState';

const Count = () => {
    const { usedContextValue } = useCountState();

    return (
        <div className={styles.container}>
            <h3>Count: {usedContextValue.imagesCounter}</h3>
        </div>
    );
};

export default Count;
