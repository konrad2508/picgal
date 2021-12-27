import styles from '../styles/Menu.module.css';
import React from 'react';
import Navigation from './Navigation';
import TagLists from './TagLists';
import Metadata from './Metadata';
import AppState from '../enums/AppState';

const Menu = ({ sendQuery,
                onBackClick,
                query,
                handleQueryChange,
                appState,
                imagesToShow,
                onClickTag,
                onSaveModifiedTagsClick,
                onSearchFavouritesClick,
                existingTags }) => {

    const renderImageInfo = () => {
        const img = imagesToShow[0];

        return (
            <>
                <TagLists
                    img={img}
                    onClickTag={onClickTag}
                    onSaveModifiedTagsClick={onSaveModifiedTagsClick}
                    existingTags={existingTags}
                />
                <Metadata img={img} onSaveModifiedTagsClick={onSaveModifiedTagsClick}/>
            </>
        )
    }

    return (
        <div className={styles.container}>
            <Navigation
                query={query}
                sendQuery={sendQuery}
                onBackClick={onBackClick}
                handleQueryChange={handleQueryChange}
                onSearchFavouritesClick={onSearchFavouritesClick}
                appState={appState}
                existingTags={existingTags}
            />
            { appState === AppState.PREVIEW && renderImageInfo() }
        </div>
    );
};

export default Menu;
