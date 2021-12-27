import React from 'react';
import imageService from '../services/imageService'
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
        imageService
            .getTags()
            .then(tags => setExistingTags(tags));
    }, []);

    const switchState = (command, args) => {
        switch (command) {
            case Command.SEARCH: {
                const { event } = args;
                event.preventDefault();

                const cmd = () => (
                    (query) => {
                        imageService
                            .getImagesStats(query)
                            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));
        
                        imageService
                            .getImages(query, 1)
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
                        const queryableTag = tag.replaceAll(' ', '_');
        
                        imageService
                            .getImagesStats(queryableTag)
                            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));
        
                        imageService
                            .getImages(queryableTag)
                            .then(images => setImagesToShow(images));
                        
                        setAppState(AppState.BROWSING);
                        setUsedQuery(queryableTag);
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
        
                        imageService
                            .getImages(query, newPageNum)
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

                imageService
                    .modifyImage(id, modifications)
                    .then(modifiedImage => {
                        setImagesToShow([modifiedImage]);

                        imageService
                            .getTags()
                            .then(tags => setExistingTags(tags));
                    })
                    .catch(error => {});
                
                break;
            }

            case Command.CLICK_FAVOURITES: {
                const cmd = () => (
                    () => {
                        imageService
                            .getFavouriteImagesStats()
                            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));
        
                        imageService
                            .getFavouriteImages(1)
                            .then(images => setImagesToShow(images));
        
                        setAppState(AppState.BROWSING);
                        setUsedQuery('Favourites');
                        setQuery('');
                        setCurrentPage(1);
                    }
                )();
        
                cmd();
                setHistory([...history, cmd]);

                break;
            }

            default: {}
        }        
    };

    return {
        appState: { query, imagesToShow, appState, usedQuery, currentPage, maxPage, history, existingTags },
        switchState
    };
};

export default useAppState;
