import styles from './UsedQuery.module.css';
import React from 'react';
import useUsedQueryState from './useUsedQueryState';

const UsedQuery = () => {
    const { usedContextValue } = useUsedQueryState();

    return (
        <div className={styles.container}>
            <h3>Query: {usedContextValue.usedQuery}</h3>
        </div>
    );
};

export default UsedQuery;
