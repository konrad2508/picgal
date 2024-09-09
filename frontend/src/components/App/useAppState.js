import React from 'react';
import appStateService from '../../services/appStateService';
import AppState from '../../enums/AppState';
import ViewEncrypted from '../../enums/ViewEncrypted';

const useAppState = () => {
    const [ query, setQuery ] = React.useState('');
    const [ imagesCounter, setImagesCounter ] = React.useState(0);
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
    const [ multiselectImages, setMultiselectImages ] = React.useState([]);
    const [ config, setConfig ] = React.useState({});
    const [ downloadedFilePath, setDownloadedFilePath ] = React.useState('');
    const [ showOriginal, setShowOriginal ] = React.useState(false);
    const [ scanReportFilePath, setScanReportFilePath ] = React.useState('');

    const clearState = () => {
        setQuery('');
        setImagesCounter(0);
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
        setImagesCounter,
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
        setMultiselectImages,
        setConfig,
        setDownloadedFilePath,
        setShowOriginal,
        setScanReportFilePath
    };
    const hookService = appStateService(setters, history, multiselectImages);

    React.useEffect(hookService.fetchSavedDataEffect, []);

    const sendQuery = (event) => {
        event.preventDefault();

        hookService.searchCommand(query, viewEncrypted);
    };

    const sendQueryInMultiselect = (event) => {
        event.preventDefault();

        hookService.searchInMultiselectCommand(query, viewEncrypted);
    };

    const onImagePreviewClick = (img) => hookService.previewCommand(img);
    const handleQueryChange = (event) => hookService.queryChangeCommand(event);
    const onClickTag = (tag) => hookService.clickTagCommand(tag, viewEncrypted);
    const onBackClick = () => hookService.clickBackCommand();
    const onPageNavClick = (newPage) => hookService.pageNavCommand(usedQuery, newPage, viewEncrypted);
    const onSaveModifiedTagsClick = (id, modifications) => hookService.modifyImageCommand(id, modifications, viewEncrypted);
    const onClickSavedQuery = (savedQuery) => hookService.clickSavedQueryCommand(savedQuery.query, viewEncrypted);
    const onModifySavedQuery = (id, modifications) => hookService.modifySavedQueryCommand(id, modifications, savedQueries);
    const onDeleteSavedQuery = (id) => hookService.deleteSavedQueryCommand(id, savedQueries);
    const onAddSavedQuery = (newSavedQuery) => hookService.addSavedQueryCommand(newSavedQuery, savedQueries);
    const onSyncDatabase = () => hookService.syncDatabase(viewEncrypted);
    const onStartDuplicatesScanner = () => hookService.startDuplicatesScannerCommand();
    const onStartBatchTagEditor = () => hookService.startBatchTagEditorCommand(viewEncrypted);
    const onStartSettings = () => hookService.startSettingsCommand();
    const onStartEncryptor = () => hookService.startEncryptorCommand(viewEncrypted);
    const onStartScanning = (scanDir, outDir, viewEncrypted) => hookService.startScanningCommand(scanDir, outDir, viewEncrypted);
    const onClickEncrypt = () => hookService.clickEncryptCommand(viewEncrypted);
    const onClickViewEncrypted = () => hookService.clickViewEncrypted(viewEncrypted);
    const onSaveSettings = (modifications) => hookService.saveSettingsCommand(modifications);
    const onClickPreviewInMultiselect = (img) => hookService.clickPreviewInMultiselectCommand(img);
    const onCancelMultiselect = () => hookService.cancelMultiselectCommand();
    const onClickTitle = () => hookService.clickTitleCommand();
    const onClickSavedQueryInMultiselect = (savedQuery) => hookService.clickSavedQueryInMultiselectCommand(savedQuery.query, viewEncrypted);
    const onSaveModifiedTagsClickInBatchTagEditor = (_, modifications) => hookService.modifyImageInBatchTagEditorCommand(modifications, viewEncrypted);
    const onPageNavClickInMultiselect = (newPage) => hookService.pageNavInMultiselectCommand(usedQuery, newPage, viewEncrypted);
    const onClickSaveImage = (id, dir, filename) => hookService.clickSaveImageCommand(id, dir, filename);
    const onToggleShowOriginal = () => hookService.toggleShowOriginal(showOriginal);

    const contextValue = {
        appState,
        viewEncrypted,
        query,
        usedQuery,
        savedQueries,
        imagesCounter,
        imagesToShow,
        existingTags,
        pageNumber: currentPage,
        maxPage,
        deletedCounter,
        restoredPreviewsCounter,
        restoredSamplesCounter,
        addCounter,
        historyLength: history.length - 1,
        multiselectSelected: multiselectImages,
        config,
        downloadedFilePath,
        showOriginal,
        scanReportFilePath,
        sendQuery,
        handleQueryChange,
        onImagePreviewClick,
        onPageNavClick,
        onBackClick,
        onClickTag,
        onSaveModifiedTagsClick,
        onClickSavedQuery,
        onModifySavedQuery,
        onDeleteSavedQuery,
        onAddSavedQuery,
        onSyncDatabase,
        onStartDuplicatesScanner,
        onStartBatchTagEditor,
        onStartSettings,
        onStartEncryptor,
        onStartScanning,
        onClickEncrypt,
        onClickViewEncrypted,
        onSaveSettings,
        onClickPreviewInMultiselect,
        sendQueryInMultiselect,
        onCancelMultiselect,
        onClickTitle,
        onClickSavedQueryInMultiselect,
        onSaveModifiedTagsClickInBatchTagEditor,
        onPageNavClickInMultiselect,
        onClickSaveImage,
        onToggleShowOriginal
    };

    return {
        contextValue
    };
};

export default useAppState;
