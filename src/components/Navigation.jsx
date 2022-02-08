import styles from '../styles/Navigation.module.css';
import React from 'react';
import SearchBar from './SearchBar';
import SavedQueriesList from './SavedQueriesList';

const Navigation = ({   query,
                        sendQuery,
                        onBackClick,
                        handleQueryChange,
                        onSearchFavouritesClick,
                        appState,
                        existingTags,
                        savedQueries,
                        onClickSavedQuery,
                        onModifySavedQuery,
                        onDeleteSavedQuery,
                        onAddSavedQuery }) => {
    
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
            <SavedQueriesList
                onSearchFavouritesClick={onSearchFavouritesClick}
                savedQueries={savedQueries}
                onClickSavedQuery={onClickSavedQuery}
                onModifySavedQuery={onModifySavedQuery}
                onDeleteSavedQuery={onDeleteSavedQuery}
                onAddSavedQuery={onAddSavedQuery}
                existingTags={existingTags}
            />
        </div>
    );
};

export default Navigation;
