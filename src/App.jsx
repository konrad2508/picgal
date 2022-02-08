import './styles/main.css';
import styles from './styles/App.module.css';
import React from 'react';
import Title from './components/Title';
import Menu from './components/Menu';
import Content from './components/Content';
import Command from './enums/Command';
import useAppState from './hooks/useAppState';

const App = () => {
    const { appState, switchState } = useAppState();

    const sendQuery               = (event)             => switchState(Command.SEARCH, { event });
    const onImagePreviewClick     = (img)               => switchState(Command.PREVIEW, { img });
    const handleQueryChange       = (event)             => switchState(Command.QUERY_CHANGE, { event });
    const onClickTag              = (tag)               => switchState(Command.CLICK_TAG, { tag });
    const onBackClick             = ()                  => switchState(Command.CLICK_BACK, {  });
    const onPageNavClick          = (pageStep)          => switchState(Command.PAGE_NAV, { pageStep });
    const onSaveModifiedTagsClick = (id, modifications) => switchState(Command.MODIFY_IMG, { id, modifications });
    const onSearchFavouritesClick = ()                  => switchState(Command.CLICK_FAVOURITES, {  });
    const onClickSavedQuery       = (savedQuery)        => switchState(Command.CLICK_SAVED_QUERY, { savedQuery })
    const onModifySavedQuery      = (id, modifications) => switchState(Command.MODIFY_SAVED_QUERY, { id, modifications });
    const onDeleteSavedQuery      = (id)                => switchState(Command.DELETE_SAVED_QUERY, { id });
    const onAddSavedQuery         = (newSavedQuery)     => switchState(Command.ADD_SAVED_QUERY, { newSavedQuery });

    return (
        <div className={styles.main}>
            <Title/>
            <div className={styles.app}>
                <Menu
                    sendQuery={sendQuery}
                    onBackClick={onBackClick}
                    query={appState.query}
                    handleQueryChange={handleQueryChange}
                    appState={appState.appState}
                    imagesToShow={appState.imagesToShow}
                    onClickTag={onClickTag}
                    onSaveModifiedTagsClick={onSaveModifiedTagsClick}
                    onSearchFavouritesClick={onSearchFavouritesClick}
                    existingTags={appState.existingTags}
                    savedQueries={appState.savedQueries}
                    onClickSavedQuery={onClickSavedQuery}
                    onModifySavedQuery={onModifySavedQuery}
                    onDeleteSavedQuery={onDeleteSavedQuery}
                    onAddSavedQuery={onAddSavedQuery}
                />
                <Content
                    usedQuery={appState.usedQuery}
                    imagesToShow={appState.imagesToShow}
                    appState={appState.appState}
                    onImagePreviewClick={onImagePreviewClick}
                    pageNumber={appState.currentPage}
                    maxPage={appState.maxPage}
                    onPageNavClick={onPageNavClick}
                />
            </div>
        </div>
    );
};

export default App;
