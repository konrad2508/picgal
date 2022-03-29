import React from 'react';
import SavedQueriesListCommand from '../enums/SavedQueriesListCommand';
import savedQueriesListStateService from '../services/savedQueriesListStateService';

const useSavedQueriesListState = () => {
    const [ displaySavedQueries, setDisplaySavedQueries ] = React.useState(false);
    const [ modificationMode, setModificatonMode ] = React.useState(false);

    const hookService = savedQueriesListStateService({ setDisplaySavedQueries, setModificatonMode })

    const setSavedQueriesListState = (command, args) => {
        switch (command) {
            case SavedQueriesListCommand.EXECUTE_SAVED_QUERY: {
                const { savedQuery, onClickSavedQuery } = args;

                hookService.executeSavedQueryCommand(savedQuery, onClickSavedQuery);

                break;
            }

            case SavedQueriesListCommand.EXECUTE_SEARCH_FAVOURITES: {
                const { onSearchFavouritesClick } = args;

                hookService.executeSearchFavouritesCommand(onSearchFavouritesClick);

                break;
            }

            case SavedQueriesListCommand.TOGGLE_DISPLAY_SAVED_QUERIES: {
                hookService.toggleDisplaySavedQueriesCommand(displaySavedQueries);

                break;
            }
            
            case SavedQueriesListCommand.ENTER_MODIFICATION_MODE: {
                hookService.enterModificationModeCommand();

                break;
            }

            case SavedQueriesListCommand.EXIT_MODIFICATION_MODE: {
                hookService.exitModificationModeCommand();

                break;
            }

            default: { }
        }
    };

    return {
        savedQueriesListState: { displaySavedQueries, modificationMode },
        setSavedQueriesListState
    };
};

export default useSavedQueriesListState;
