import styles from '../styles/Navigation.module.css';
import React from 'react';
import SearchBar from './SearchBar';
import SavedQueriesList from './SavedQueriesList';

const Navigation = () => {
    return (
        <div className={styles.container}>
            <h2>Navigate</h2>
            <SearchBar/>
            <SavedQueriesList/>
        </div>
    );
};

export default Navigation;
