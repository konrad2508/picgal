import React from 'react';
import requestService from '../services/requestService'
import queryService from '../services/queryService';
import Command from '../enums/Command';
import AppState from '../enums/AppState';

const useAppState = () => {
    const [query, setQuery] = React.useState('');
    const [imagesToShow, setImagesToShow] = React.useState([]);
    const [appState, setAppState] = React.useState(AppState.START);
    const [usedQuery, setUsedQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(1);
    const [existingTags, setExistingTags] = React.useState([]);
    const [savedQueries, setSavedQueries] = React.useState([]);

    const clearState = () => {
        setQuery('');
        setImagesToShow([]);
        setAppState(AppState.START);
        setUsedQuery('');
        setCurrentPage(1);
        setMaxPage(1);
    };
    const [history, setHistory] = React.useState([clearState]);

    React.useEffect(() => {
        requestService
            .getTags()
            .then(tags => setExistingTags(tags));
        
        requestService
            .getSavedQueries()
            .then(queries => setSavedQueries(queries));
    }, []);

    const switchState = (command, args) => {
        switch (command) {
            case Command.SEARCH: {
                const { event } = args;
                event.preventDefault();

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
                )(query);
        
                cmd();
                setHistory([...history, cmd]);

                break;
            }

            case Command.PREVIEW: {
                const { img } = args;

                const cmd = () => (
                    (img) => {
                        setImagesToShow([img]);
                        setAppState(AppState.PREVIEW);
                    }
                )(img);
        
                cmd();
                setHistory([...history, cmd]);

                break;
            }

            case Command.QUERY_CHANGE: {
                const { event } = args;

                setQuery(event.target.value);

                break;
            }

            case Command.CLICK_TAG: {
                const { tag } = args;

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
                )(tag);
        
                cmd();
                setHistory([...history, cmd]);

                break;
            }

            case Command.CLICK_BACK: {
                if (history.length > 1) {
                    history.at(-2)();
                    setHistory(history.slice(0, -1));
                }

                break;
            }

            case Command.PAGE_NAV: {
                const { pageStep } = args;

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
                )(usedQuery, currentPage, pageStep);
        
                cmd();
                setHistory([...history, cmd]);

                break;
            }

            case Command.MODIFY_IMG: {
                const { id, modifications } = args;

                requestService
                    .modifyImage(id, modifications)
                    .then(modifiedImage => {
                        setImagesToShow([modifiedImage]);

                        requestService
                            .getTags()
                            .then(tags => setExistingTags(tags));
                    });
                
                break;
            }

            case Command.CLICK_FAVOURITES: {
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

                break;
            }

            case Command.CLICK_SAVED_QUERY: {
                const { savedQuery } = args;

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
                )(savedQuery.query);
                
                cmd();
                setHistory([...history, cmd]);

                break;
            }

            case Command.MODIFY_SAVED_QUERY: {
                const { id, modifications } = args;

                requestService
                    .modifySavedQuery(id, modifications)
                    .then(modifiedSavedQuery => {
                        const newSavedQueries = [...savedQueries];
                        
                        const idx = newSavedQueries.findIndex((e) => e.id === id);
                        newSavedQueries[idx] = modifiedSavedQuery;
                        
                        setSavedQueries(newSavedQueries);
                    });

                break;
            }

            case Command.DELETE_SAVED_QUERY: {
                const { id } = args;

                requestService
                    .deleteSavedQuery(id)
                    .then((_) => {
                        const newSavedQueries = [...savedQueries];

                        const idx = newSavedQueries.findIndex((e) => e.id === id);
                        newSavedQueries.splice(idx, 1);

                        setSavedQueries(newSavedQueries);
                    });

                break;
            }
            
            case Command.ADD_SAVED_QUERY: {
                const { newSavedQuery } = args;

                requestService
                    .createSavedQuery(newSavedQuery)
                    .then((createdSavedQuery) => setSavedQueries([...savedQueries, createdSavedQuery]));

                break;
            }

            default: {}
        }        
    };

    return {
        appState: { query, imagesToShow, appState, usedQuery, currentPage, maxPage, history, existingTags, savedQueries },
        switchState
    };
};

export default useAppState;
