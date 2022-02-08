import React from 'react';
import SavedQueriesListCommand from '../enums/SavedQueriesListCommand';

const useSavedQueriesListState = () => {
    const [ displaySavedQueries, setDisplaySavedQueries ] = React.useState(false);
    const [ modificationMode, setModificatonMode ] = React.useState(false);

    const setSavedQueriesListState = (command, args) => {
        switch (command) {
            case SavedQueriesListCommand.EXECUTE_SAVED_QUERY: {
                const { savedQuery, onClickSavedQuery } = args;

                setDisplaySavedQueries(false);
                onClickSavedQuery(savedQuery);

                break;
            }

            case SavedQueriesListCommand.EXECUTE_SEARCH_FAVOURITES: {
                const { onSearchFavouritesClick } = args;

                setDisplaySavedQueries(false);
                onSearchFavouritesClick();

                break;
            }

            case SavedQueriesListCommand.TOGGLE_DISPLAY_SAVED_QUERIES: {
                setDisplaySavedQueries(!displaySavedQueries);

                break;
            }
            
            case SavedQueriesListCommand.ENTER_MODIFICATION_MODE: {
                setModificatonMode(true);

                break;
            }

            case SavedQueriesListCommand.EXIT_MODIFICATION_MODE: {
                setModificatonMode(false);

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
