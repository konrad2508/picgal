import styles from './Navigation.module.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SavedQueriesList from '../SavedQueriesList/SavedQueriesList';

const Navigation = () => {
    return (
        <div className={styles.container}>
            <SearchBar/>
            <hr/>
            <SavedQueriesList/>
        </div>
    );
};

export default Navigation;
