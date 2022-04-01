import styles from '../styles/UsedQuery.module.css';
import React from "react";
import AppContext from './context/AppContext';

const UsedQuery = () => {
    const { usedQuery } = React.useContext(AppContext);

    return (
        <div className={styles.container}>
            <h3>Query: {usedQuery}</h3>
        </div>
    );
};

export default UsedQuery;
