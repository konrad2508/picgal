import styles from '../styles/UsedQuery.module.css';
import React from "react";

const UsedQuery = ({ usedQuery }) => {
    return (
        <div className={styles.container}>
            <h3>Query: {usedQuery}</h3>
        </div>
    );
};

export default UsedQuery;
