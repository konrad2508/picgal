import React from 'react';
import appStateService from '../../services/appStateService';
import AppState from '../../enums/AppState';
import ViewEncrypted from '../../enums/ViewEncrypted';

const useAppState = () => {
    const [ query, setQuery ] = React.useState('');
    const [ imagesToShow, setImagesToShow ] = React.useState([]);
    const [ appState, setAppState ] = React.useState(AppState.START);
    const [ viewEncrypted, setViewEncrypted ] = React.useState(ViewEncrypted.NO);
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
    const [ downloadedFilePath, setDownloadedFilePath ] = React.useState('');
    const [ showOriginal, setShowOriginal ] = React.useState(false);

    const clearState = () => {
        setQuery('');
        setImagesToShow([]);
        setAppState(AppState.START);
        setUsedQuery('');
        setCurrentPage(1);
        setMaxPage(1);
        setShowOriginal(false);
    };
    const [ history, setHistory] = React.useState([clearState]);

    const setters = {
        setQuery,
        setImagesToShow,
        setAppState,
        setViewEncrypted,
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
        setConfig,
        setDownloadedFilePath,
        setShowOriginal
    };
    const hookService = appStateService(setters, history, batchEditorImages);

    React.useEffect(hookService.fetchSavedDataEffect, []);

    const sendQuery = (event) => {
        event.preventDefault();

        hookService.searchCommand(query, viewEncrypted);
    };

    const sendQueryInBatchEditor = (event) => {
        event.preventDefault();

        hookService.searchInBatchEditorCommand(query, viewEncrypted);
    };

    const onImagePreviewClick = (img) => hookService.previewCommand(img);
    const handleQueryChange = (event) => hookService.queryChangeCommand(event);
    const onClickTag = (tag) => hookService.clickTagCommand(tag, viewEncrypted);
    const onBackClick = () => hookService.clickBackCommand();
    const onPageNavClick = (newPage) => hookService.pageNavCommand(usedQuery, newPage, viewEncrypted);
    const onSaveModifiedTagsClick = (id, modifications) => hookService.modifyImageCommand(id, modifications, viewEncrypted);
    const onSearchFavouritesClick = () => hookService.clickFavouritesCommand(viewEncrypted);
    const onClickSavedQuery = (savedQuery) => hookService.clickSavedQueryCommand(savedQuery.query, viewEncrypted);
    const onModifySavedQuery = (id, modifications) => hookService.modifySavedQueryCommand(id, modifications, savedQueries);
    const onDeleteSavedQuery = (id) => hookService.deleteSavedQueryCommand(id, savedQueries);
    const onAddSavedQuery = (newSavedQuery) => hookService.addSavedQueryCommand(newSavedQuery, savedQueries);
    const onSyncDatabase = () => hookService.syncDatabase(viewEncrypted);
    const onStartBatchEditor = () => hookService.startBatchEditorCommand(viewEncrypted);
    const onStartSettings = () => hookService.startSettingsCommand();
    const onStartEncryptor = () => hookService.startEncryptorCommand(viewEncrypted);
    const onClickEncrypt = () => hookService.clickEncryptCommand();
    const onClickViewEncrypted = () => hookService.clickViewEncrypted(viewEncrypted);
    const onSaveSettings = (modifications) => hookService.saveSettingsCommand(modifications);
    const onClickPreviewInBatchEditor = (img) => hookService.clickPreviewInBatchEditorCommand(img);
    const onCancelBatchEditor = () => hookService.cancelBatchEditorCommand();
    const onClickTitle = () => hookService.clickTitleCommand();
    const onSearchFavouritesClickInBatchEditor = () => hookService.clickFavouritesInBatchEditorCommand(viewEncrypted);
    const onClickSavedQueryInBatchEditor = (savedQuery) => hookService.clickSavedQueryInBatchEditorCommand(savedQuery.query, viewEncrypted);
    const onSaveModifiedTagsClickInBatchEditor = (_, modifications) => hookService.modifyImageInBatchEditorCommand(modifications, viewEncrypted);
    const onPageNavClickInBatchEditor = (newPage) => hookService.pageNavInBatchEditorCommand(usedQuery, newPage, viewEncrypted);
    const onClickSaveImage = (id, dir, filename) => hookService.clickSaveImageCommand(id, dir, filename);
    const onToggleShowOriginal = () => hookService.toggleShowOriginal(showOriginal);

    const contextValue = {
        appState,
        viewEncrypted,
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
        downloadedFilePath,
        showOriginal,
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
        onStartEncryptor,
        onClickEncrypt,
        onClickViewEncrypted,
        onSaveSettings,
        onClickPreviewInBatchEditor,
        sendQueryInBatchEditor,
        onCancelBatchEditor,
        onClickTitle,
        onSearchFavouritesClickInBatchEditor,
        onClickSavedQueryInBatchEditor,
        onSaveModifiedTagsClickInBatchEditor,
        onPageNavClickInBatchEditor,
        onClickSaveImage,
        onToggleShowOriginal
    };

    return {
        contextValue
    };
};

export default useAppState;
