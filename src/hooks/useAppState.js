import React from 'react';
import appStateService from '../services/appStateService';
import AppState from '../enums/AppState';

const useAppState = () => {
    const [ query, setQuery ] = React.useState('');
    const [ imagesToShow, setImagesToShow ] = React.useState([]);
    const [ appState, setAppState ] = React.useState(AppState.START);
    const [ usedQuery, setUsedQuery ] = React.useState('');
    const [ currentPage, setCurrentPage ] = React.useState(1);
    const [ maxPage, setMaxPage ] = React.useState(1);
    const [ existingTags, setExistingTags ] = React.useState([]);
    const [ savedQueries, setSavedQueries ] = React.useState([]);
    const [ deletedCounter, setDeletedCounter ] = React.useState(-1);
    const [ restoredPreviewsCounter, setRestoredPreviewsCounter ] = React.useState(-1);
    const [ restoredSamplesCounter, setRestoredSamplesCounter ] = React.useState(-1);
    const [ addCounter, setAddCounter ] = React.useState(-1);
    const [ batchEditorImages, setBatchEditorImages ] = React.useState([]);
    const [ config, setConfig ] = React.useState({});

    const clearState = () => {
        setQuery('');
        setImagesToShow([]);
        setAppState(AppState.START);
        setUsedQuery('');
        setCurrentPage(1);
        setMaxPage(1);
    };
    const [ history, setHistory] = React.useState([clearState]);

    const setters = {
        setQuery,
        setImagesToShow,
        setAppState,
        setUsedQuery,
        setCurrentPage,
        setMaxPage,
        setExistingTags,
        setSavedQueries,
        setHistory,
        setDeletedCounter,
        setRestoredPreviewsCounter,
        setRestoredSamplesCounter,
        setAddCounter,
        setBatchEditorImages,
        setConfig
    };
    const hookService = appStateService(setters, history, batchEditorImages);

    React.useEffect(hookService.fetchSavedDataEffect, []);

    const sendQuery = (event) => {
        event.preventDefault();

        hookService.searchCommand(query);
    };

    const onImagePreviewClick = (img) => hookService.previewCommand(img);

    const handleQueryChange = (event) => hookService.queryChangeCommand(event);

    const onClickTag = (tag) => hookService.clickTagCommand(tag);

    const onBackClick = () => hookService.clickBackCommand();

    const onPageNavClick = (pageStep) => hookService.pageNavCommand(usedQuery, currentPage, pageStep);

    const onSaveModifiedTagsClick = (id, modifications) => hookService.modifyImageCommand(id, modifications);

    const onSearchFavouritesClick = () => hookService.clickFavouritesCommand();

    const onClickSavedQuery = (savedQuery) => hookService.clickSavedQueryCommand(savedQuery.query);

    const onModifySavedQuery = (id, modifications) => hookService.modifySavedQueryCommand(id, modifications, savedQueries);

    const onDeleteSavedQuery = (id) => hookService.deleteSavedQueryCommand(id, savedQueries);

    const onAddSavedQuery = (newSavedQuery) => hookService.addSavedQueryCommand(newSavedQuery, savedQueries);

    const onSyncDatabase = () => hookService.syncDatabase();

    const onStartBatchEditor = () => hookService.startBatchEditorCommand();

    const onStartSettings = () => hookService.startSettingsCommand();

    const onSaveSettings = (modifications) => hookService.saveSettingsCommand(modifications);

    const onClickPreviewInBatchEditor = (img) => hookService.clickPreviewInBatchEditorCommand(img);

    const sendQueryInBatchEditor = (event) => {
        event.preventDefault();

        hookService.searchInBatchEditorCommand(query);
    }

    const onCancelBatchEditor = () => hookService.cancelBatchEditorCommand();

    const onClickTitle = () => hookService.clickTitleCommand();

    const onSearchFavouritesClickInBatchEditor = () => hookService.clickFavouritesInBatchEditorCommand();

    const onClickSavedQueryInBatchEditor = (savedQuery) => hookService.clickSavedQueryInBatchEditorCommand(savedQuery.query);

    const onSaveModifiedTagsClickInBatchEditor = (_, modifications) => hookService.modifyImageInBatchEditorCommand(modifications);

    const onPageNavClickInBatchEditor = (pageStep) => hookService.pageNavInBatchEditorCommand(usedQuery, currentPage, pageStep);

    const contextValue = {
        appState,
        query,
        usedQuery,
        savedQueries,
        imagesToShow,
        existingTags,
        pageNumber: currentPage,
        maxPage,
        deletedCounter,
        restoredPreviewsCounter,
        restoredSamplesCounter,
        addCounter,
        historyLength: history.length - 1,
        batchEditorSelected: batchEditorImages,
        config,
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

    return contextValue;
};

export default useAppState;
