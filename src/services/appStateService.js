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
                            setAddCounter },
                            history) => {
    
    const fetchSavedDataEffect = () => {
        requestService
            .getTags()
            .then(tags => setExistingTags(tags));
        
        requestService
            .getSavedQueries()
            .then(queries => setSavedQueries(queries));
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
                
                setAppState(AppState.BROWSING);
                setUsedQuery(query);
                setQuery('');
                setCurrentPage(newPageNum)
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
                    setDeletedCounter(0);
                    setRestoredPreviewsCounter(0);
                    setRestoredSamplesCounter(0);
                    setAddCounter(0);
                }, 3000);

                requestService
                    .getTags()
                    .then(tags => setExistingTags(tags));
            });
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
        syncDatabase
    };
};

export default appStateService;
