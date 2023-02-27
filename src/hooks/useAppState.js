import React from 'react';
import appStateService from '../services/appStateService';
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
    const [deletedCounter, setDeletedCounter] = React.useState(-1);
    const [restoredPreviewsCounter, setRestoredPreviewsCounter] = React.useState(-1);
    const [restoredSamplesCounter, setRestoredSamplesCounter] = React.useState(-1);
    const [addCounter, setAddCounter] = React.useState(-1);

    const clearState = () => {
        setQuery('');
        setImagesToShow([]);
        setAppState(AppState.START);
        setUsedQuery('');
        setCurrentPage(1);
        setMaxPage(1);
    };
    const [history, setHistory] = React.useState([clearState]);

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
        setAddCounter
    };
    const hookService = appStateService(setters, history);

    React.useEffect(hookService.fetchSavedDataEffect, []);

    const switchState = (command, args) => {
        switch (command) {
            case Command.SEARCH: {
                const { event } = args;
                event.preventDefault();

                hookService.searchCommand(query);

                break;
            }

            case Command.PREVIEW: {
                const { img } = args;

                hookService.previewCommand(img);

                break;
            }

            case Command.QUERY_CHANGE: {
                const { event } = args;

                hookService.queryChangeCommand(event);

                break;
            }

            case Command.CLICK_TAG: {
                const { tag } = args;

                hookService.clickTagCommand(tag);

                break;
            }

            case Command.CLICK_BACK: {
                hookService.clickBackCommand();

                break;
            }

            case Command.PAGE_NAV: {
                const { pageStep } = args;
                
                hookService.pageNavCommand(usedQuery, currentPage, pageStep);

                break;
            }

            case Command.MODIFY_IMG: {
                const { id, modifications } = args;

                hookService.modifyImageCommand(id, modifications);
                
                break;
            }

            case Command.CLICK_FAVOURITES: {
                hookService.clickFavouritesCommand();

                break;
            }

            case Command.CLICK_SAVED_QUERY: {
                const { savedQuery } = args;
                
                hookService.clickSavedQueryCommand(savedQuery.query);

                break;
            }

            case Command.MODIFY_SAVED_QUERY: {
                const { id, modifications } = args;
                
                hookService.modifySavedQueryCommand(id, modifications, savedQueries);

                break;
            }

            case Command.DELETE_SAVED_QUERY: {
                const { id } = args;

                hookService.deleteSavedQueryCommand(id, savedQueries);

                break;
            }
            
            case Command.ADD_SAVED_QUERY: {
                const { newSavedQuery } = args;

                hookService.addSavedQueryCommand(newSavedQuery, savedQueries);

                break;
            }

            case Command.SYNC_DATABASE: {
                hookService.syncDatabase();

                break;
            }

            default: { }
        }        
    };

    return {
        appState: {
            query,
            imagesToShow,
            appState,
            usedQuery,
            currentPage,
            maxPage,
            history,
            existingTags,
            savedQueries,
            deletedCounter,
            restoredPreviewsCounter,
            restoredSamplesCounter,
            addCounter
        },
        switchState
    };
};

export default useAppState;
