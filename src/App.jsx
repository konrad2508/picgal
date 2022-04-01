import './styles/main.css';
import styles from './styles/App.module.css';
import React from 'react';
import Title from './components/Title';
import Menu from './components/Menu';
import Content from './components/Content';
import Command from './enums/Command';
import useAppState from './hooks/useAppState';
import AppContext from './components/context/AppContext';

const App = () => {
    const { appState, switchState } = useAppState();

    const sendQuery = (event) => switchState(Command.SEARCH, { event });
    const onImagePreviewClick = (img) => switchState(Command.PREVIEW, { img });
    const handleQueryChange = (event) => switchState(Command.QUERY_CHANGE, { event });
    const onClickTag = (tag) => switchState(Command.CLICK_TAG, { tag });
    const onBackClick = () => switchState(Command.CLICK_BACK, {  });
    const onPageNavClick = (pageStep) => switchState(Command.PAGE_NAV, { pageStep });
    const onSaveModifiedTagsClick = (id, modifications) => switchState(Command.MODIFY_IMG, { id, modifications });
    const onSearchFavouritesClick = () => switchState(Command.CLICK_FAVOURITES, {  });
    const onClickSavedQuery = (savedQuery) => switchState(Command.CLICK_SAVED_QUERY, { savedQuery })
    const onModifySavedQuery = (id, modifications) => switchState(Command.MODIFY_SAVED_QUERY, { id, modifications });
    const onDeleteSavedQuery = (id) => switchState(Command.DELETE_SAVED_QUERY, { id });
    const onAddSavedQuery = (newSavedQuery) => switchState(Command.ADD_SAVED_QUERY, { newSavedQuery });

    const appContextValue = {
        appState: appState.appState,
        query: appState.query,
        usedQuery: appState.usedQuery,
        savedQueries: appState.savedQueries,
        imagesToShow: appState.imagesToShow,
        existingTags: appState.existingTags,
        pageNumber: appState.currentPage,
        maxPage: appState.maxPage,
        sendQuery,
        handleQueryChange,
        onImagePreviewClick,
        onPageNavClick,
        onBackClick,
        onClickTag,
        onSaveModifiedTagsClick,
        onSearchFavouritesClick,
        onClickSavedQuery,
        onModifySavedQuery,
        onDeleteSavedQuery,
        onAddSavedQuery
    };

    return (
        <div className={styles.main}>
            <Title/>
            <div className={styles.app}>
                <AppContext.Provider value={appContextValue}>
                    <Menu/>
                    <Content/>
                </AppContext.Provider>
            </div>
        </div>
    );
};

export default App;
