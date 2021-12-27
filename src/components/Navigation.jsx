import styles from '../styles/NavBar.module.css';
import React from 'react';
import SearchBar from './SearchBar';
import Favourites from './Favourites';

const Navigation = ({   query,
                        sendQuery,
                        onBackClick,
                        handleQueryChange,
                        onSearchFavouritesClick,
                        appState,
                        existingTags }) => {
    return (
        <div className={styles.container}>
            <h2>Navigate</h2>
            <SearchBar
                sendQuery={sendQuery}
                onBackClick={onBackClick}
                appState={appState}
                query={query}
                handleQueryChange={handleQueryChange}
                existingTags={existingTags}
            />
            <Favourites onSearchFavouritesClick={onSearchFavouritesClick}/>
        </div>
    );
};

export default Navigation;
