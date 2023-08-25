import requestService from '../services/requestService'
import queryService from '../services/queryService';
import AppState from '../enums/AppState';

const appStateService = ({  setQuery,
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
                            setConfig },
                            history,
                            batchEditorImages) => {
    
    const fetchSavedDataEffect = () => {
        requestService
            .getTags()
            .then(tags => setExistingTags(tags));
        
        requestService
            .getSavedQueries()
            .then(queries => setSavedQueries(queries));
        
        requestService
            .getConfig()
            .then(config => setConfig(config));
    };

    const searchCommand = (q) => {
        const cmd = () => (
            (query) => {
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(query);

                requestService
                    .getImagesStats(urlFormattedQuery)
                    .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

                requestService
                    .getImages(urlFormattedQuery, 1)
                    .then(images => setImagesToShow(images));

                setAppState(AppState.BROWSING);
                setUsedQuery(query);
                setQuery('');
                setCurrentPage(1);
            }
        )(q);

        cmd();
        setHistory([...history, cmd]);
    };

    const previewCommand = (i) => {
        const cmd = () => (
            (img) => {
                setImagesToShow([img]);
                setAppState(AppState.PREVIEW);
            }
        )(i);

        cmd();
        setHistory([...history, cmd]);
    };

    const queryChangeCommand = (e) => {
        setQuery(e.target.value);
    };

    const clickTagCommand = (t) => {
        const cmd = () => (
            (tag) => {
                const inputTag = queryService.normalTagToInputTag(tag);
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(inputTag);

                requestService
                    .getImagesStats(urlFormattedQuery)
                    .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

                requestService
                    .getImages(urlFormattedQuery)
                    .then(images => setImagesToShow(images));
                
                setAppState(AppState.BROWSING);
                setUsedQuery(inputTag);
                setQuery('');
                setCurrentPage(1);
            }
        )(t);

        cmd();
        setHistory([...history, cmd]);
    };

    const clickBackCommand = () => {
        if (history.length > 1) {
            history.at(-2)();
            setHistory(history.slice(0, -1));
        }
    };

    const pageNavCommand = (usedQuery, page, step) => {
        const cmd = () => (
            (query, pageNum, pageStep) => {
                const newPageNum = pageNum + pageStep;
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(query);

                requestService
                    .getImages(urlFormattedQuery, newPageNum)
                    .then(images => setImagesToShow(images));
                
                requestService
                    .getImagesStats(urlFormattedQuery)
                    .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));
                
                setAppState(AppState.BROWSING);
                setUsedQuery(query);
                setQuery('');
                setCurrentPage(newPageNum);
            }
        )(usedQuery, page, step);

        cmd();
        setHistory([...history, cmd]);
    };

    const modifyImageCommand = (id, modifications) => {
        requestService
            .modifyImage(id, modifications)
            .then(modifiedImage => {
                setImagesToShow([modifiedImage]);

                requestService
                    .getTags()
                    .then(tags => setExistingTags(tags));
            });
    };

    const clickFavouritesCommand = () => {
        const cmd = () => (
            () => {
                const favouriteQuery = 'favourite:yes';

                const urlFormattedQuery = queryService.inputQueryToUrlQuery(favouriteQuery);

                requestService
                    .getImagesStats(urlFormattedQuery)
                    .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

                requestService
                    .getImages(urlFormattedQuery, 1)
                    .then(images => setImagesToShow(images));

                setAppState(AppState.BROWSING);
                setUsedQuery(favouriteQuery);
                setQuery('');
                setCurrentPage(1);
            }
        )();

        cmd();
        setHistory([...history, cmd]);
    };

    const clickSavedQueryCommand = (q) => {
        const cmd = () => (
            (query) => {
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(query);

                requestService
                    .getImagesStats(urlFormattedQuery)
                    .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

                requestService
                    .getImages(urlFormattedQuery, 1)
                    .then(images => setImagesToShow(images));

                setAppState(AppState.BROWSING);
                setUsedQuery(query);
                setQuery('');
                setCurrentPage(1);
            }
        )(q);

        cmd();
        setHistory([...history, cmd]);
    };

    const modifySavedQueryCommand = (id, modifications, savedQueries) => {
        requestService
            .modifySavedQuery(id, modifications)
            .then(modifiedSavedQuery => {
                const newSavedQueries = [...savedQueries];
                
                const idx = newSavedQueries.findIndex((e) => e.id === id);
                newSavedQueries[idx] = modifiedSavedQuery;
                
                setSavedQueries(newSavedQueries);
            });
    };

    const deleteSavedQueryCommand = (id, savedQueries) => {
        requestService
            .deleteSavedQuery(id)
            .then((_) => {
                const newSavedQueries = [...savedQueries];

                const idx = newSavedQueries.findIndex((e) => e.id === id);
                newSavedQueries.splice(idx, 1);

                setSavedQueries(newSavedQueries);
            });
    };

    const addSavedQueryCommand = (newSavedQuery, savedQueries) => {
        requestService
            .createSavedQuery(newSavedQuery)
            .then((createdSavedQuery) => setSavedQueries([...savedQueries, createdSavedQuery]));
    };

    const syncDatabase = () => {
        requestService
            .syncDatabase()
            .then((syncDatabaseResult) => {
                const { deletedCounter, restoredPreviewsCounter, restoredSamplesCounter, addCounter } = syncDatabaseResult;

                setDeletedCounter(deletedCounter);
                setRestoredPreviewsCounter(restoredPreviewsCounter);
                setRestoredSamplesCounter(restoredSamplesCounter);
                setAddCounter(addCounter);

                setTimeout(() => {
                    setDeletedCounter(-1);
                    setRestoredPreviewsCounter(-1);
                    setRestoredSamplesCounter(-1);
                    setAddCounter(-1);
                }, 3000);

                requestService
                    .getTags()
                    .then(tags => setExistingTags(tags));
            });
    };

    const startBatchEditorCommand = () => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery('');

        requestService
            .getImagesStats(urlFormattedQuery)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1)
            .then(images => setImagesToShow(images));

        setAppState(AppState.BATCH_EDITING);
        setUsedQuery('');
        setQuery('');
        setCurrentPage(1);
    };

    const clickPreviewInBatchEditorCommand = (img) => {
        const alreadyAdded = batchEditorImages.some((i) => i.id === img.id);

        if (alreadyAdded) {
            setBatchEditorImages(batchEditorImages.filter((v, _) => v.id !== img.id))
        }
        else {
            setBatchEditorImages([...batchEditorImages, img])
        }
    };

    const searchInBatchEditorCommand = (q) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery(q);

        requestService
            .getImagesStats(urlFormattedQuery)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1)
            .then(images => setImagesToShow(images));

        setUsedQuery(q);
        setQuery('');
        setCurrentPage(1);
    };

    const cancelBatchEditorCommand = () => {
        setAppState(AppState.START);
        setBatchEditorImages([]);
    };

    const startSettingsCommand = () => {
        const cmd = () => (
            () => {
                setAppState(AppState.SETTINGS);
                setUsedQuery('');
                setQuery('');
                setCurrentPage(1);
                setMaxPage(1);
                setImagesToShow([]);
            }
        )();

        cmd();
        setHistory([...history, cmd]);
    };

    const saveSettingsCommand = (modifications) => {
        requestService
            .modifyConfig(modifications)
            .then(modifiedConfig => setConfig(modifiedConfig));

        setAppState(AppState.START);
    };

    const clickTitleCommand = () => {
        const cmd = () => (
            () => {
                setAppState(AppState.START);
                setUsedQuery('');
                setQuery('');
                setCurrentPage(1);
                setMaxPage(1);
                setImagesToShow([]);
            }
        )();

        cmd();
        setHistory([...history, cmd]);
    };

    const clickFavouritesInBatchEditorCommand = () => {
        const favouriteQuery = 'favourite:yes';

        const urlFormattedQuery = queryService.inputQueryToUrlQuery(favouriteQuery);

        requestService
            .getImagesStats(urlFormattedQuery)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1)
            .then(images => setImagesToShow(images));

        setUsedQuery(favouriteQuery);
        setQuery('');
        setCurrentPage(1);
    };

    const clickSavedQueryInBatchEditorCommand = (q) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery(q);

        requestService
            .getImagesStats(urlFormattedQuery)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1)
            .then(images => setImagesToShow(images));

        setUsedQuery(q);
        setQuery('');
        setCurrentPage(1);
    };

    const modifyImageInBatchEditorCommand = (modifications) => {
        const batchModifications = {...modifications, ids: batchEditorImages.map((v) => v.id)};

        requestService
            .modifyImageBatch(batchModifications)
            .then((_) => {
                requestService
                    .getTags()
                    .then(tags => setExistingTags(tags));
            });

        setAppState(AppState.START);
        setBatchEditorImages([]);
    };

    const pageNavInBatchEditorCommand = (usedQuery, page, step) => {
        const newPageNum = page + step;
        const urlFormattedQuery = queryService.inputQueryToUrlQuery(usedQuery);

        requestService
            .getImages(urlFormattedQuery, newPageNum)
            .then(images => setImagesToShow(images));

        setUsedQuery(usedQuery);
        setQuery('');
        setCurrentPage(newPageNum);
    };

    return {
        fetchSavedDataEffect,
        searchCommand,
        previewCommand,
        queryChangeCommand,
        clickTagCommand,
        clickBackCommand,
        pageNavCommand,
        modifyImageCommand,
        clickFavouritesCommand,
        clickSavedQueryCommand,
        modifySavedQueryCommand,
        deleteSavedQueryCommand,
        addSavedQueryCommand,
        syncDatabase,
        startBatchEditorCommand,
        clickPreviewInBatchEditorCommand,
        searchInBatchEditorCommand,
        cancelBatchEditorCommand,
        startSettingsCommand,
        saveSettingsCommand,
        clickTitleCommand,
        clickFavouritesInBatchEditorCommand,
        clickSavedQueryInBatchEditorCommand,
        modifyImageInBatchEditorCommand,
        pageNavInBatchEditorCommand
    };
};

export default appStateService;
