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
    const onSyncDatabase = () => switchState(Command.SYNC_DATABASE, {  });
    const onStartBatchEditor = () => switchState(Command.START_BATCH_EDITOR, {  });
    const onStartSettings = () => switchState(Command.START_SETTINGS, {  });
    const onSaveSettings = (modifications) => switchState(Command.SAVE_SETTINGS, { modifications });
    const onClickPreviewInBatchEditor = (img) => switchState(Command.CLICK_PREVIEW_IN_BATCH_EDITOR, { img });
    const sendQueryInBatchEditor = (event) => switchState(Command.SEARCH_IN_BATCH_EDITOR, { event });
    const onCancelBatchEditor = () => switchState(Command.CANCEL_BATCH_EDITOR, {  });
    const onClickTitle = () => switchState(Command.CLICK_TITLE, {  });
    const onSearchFavouritesClickInBatchEditor = () => switchState(Command.CLICK_FAVOURITES_IN_BATCH_EDITOR, {  });
    const onClickSavedQueryInBatchEditor = (savedQuery) => switchState(Command.CLICK_SAVED_QUERY_IN_BATCH_EDITOR, { savedQuery });
    const onSaveModifiedTagsClickInBatchEditor = (_, modifications) => switchState(Command.MODIFY_IMG_IN_BATCH_EDITOR, { modifications });
    const onPageNavClickInBatchEditor = (pageStep) => switchState(Command.PAGE_NAV_IN_BATCH_EDITOR, { pageStep });

    const appContextValue = {
        appState: appState.appState,
        query: appState.query,
        usedQuery: appState.usedQuery,
        savedQueries: appState.savedQueries,
        imagesToShow: appState.imagesToShow,
        existingTags: appState.existingTags,
        pageNumber: appState.currentPage,
        maxPage: appState.maxPage,
        deletedCounter: appState.deletedCounter,
        restoredPreviewsCounter: appState.restoredPreviewsCounter,
        restoredSamplesCounter: appState.restoredSamplesCounter,
        addCounter: appState.addCounter,
        historyLength: appState.history.length - 1,
        batchEditorSelected: appState.batchEditorImages,
        config: appState.config,
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
        onAddSavedQuery,
        onSyncDatabase,
        onStartBatchEditor,
        onStartSettings,
        onSaveSettings,
        onClickPreviewInBatchEditor,
        sendQueryInBatchEditor,
        onCancelBatchEditor,
        onClickTitle,
        onSearchFavouritesClickInBatchEditor,
        onClickSavedQueryInBatchEditor,
        onSaveModifiedTagsClickInBatchEditor,
        onPageNavClickInBatchEditor
    };

    return (
        <div className={styles.main}>
            <AppContext.Provider value={appContextValue}>
                <Title/>
                <div className={styles.app}>
                    <Menu/>
                    <Content/>
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default App;
