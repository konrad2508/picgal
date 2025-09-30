import styles from './UsedQuery.module.css';
import React from 'react';
import useUsedQueryState from './useUsedQueryState';

const UsedQuery = () => {
    const { usedContextValue } = useUsedQueryState();

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Query</h3>
            <p className={styles.value}>{usedContextValue.usedQuery}</p>
        </div>
    );
};

export default UsedQuery;
