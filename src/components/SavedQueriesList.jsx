import styles from '../styles/SavedQueriesList.module.css';
import React from 'react';
import { FaAngleRight, FaAngleDown, FaPen } from 'react-icons/fa';
import SavedQuery from './SavedQuery';
import ModifiableSavedQueriesList from './ModifiableSavedQueriesList';
import useSavedQueriesListState from '../hooks/useSavedQueriesListState';
import SavedQueriesListCommand from '../enums/SavedQueriesListCommand';
import AppContext from './context/AppContext';
import SavedQueriesListContext from './context/SavedQueriesListContext';

const SavedQueriesList = () => {
    const { onSearchFavouritesClick, savedQueries, onClickSavedQuery } = React.useContext(AppContext);

    const { savedQueriesListState, setSavedQueriesListState } = useSavedQueriesListState();
    
    const executeSavedQuery = (savedQuery) =>
        setSavedQueriesListState(SavedQueriesListCommand.EXECUTE_SAVED_QUERY, { savedQuery, onClickSavedQuery });
    const executeSearchFavourites = () => setSavedQueriesListState(SavedQueriesListCommand.EXECUTE_SEARCH_FAVOURITES, { onSearchFavouritesClick });
    const toggleDisplaySavedQueries = () => setSavedQueriesListState(SavedQueriesListCommand.TOGGLE_DISPLAY_SAVED_QUERIES, { });
    const enterModificationMode = () => setSavedQueriesListState(SavedQueriesListCommand.ENTER_MODIFICATION_MODE, { });
    const exitModificationMode = () => setSavedQueriesListState(SavedQueriesListCommand.EXIT_MODIFICATION_MODE, { });

    const savedQueriesListContextValue = {
        executeSavedQuery,
        executeSearchFavourites,
        exitModificationMode
    };

    const renderModifyButton = () => {
        return (
            <button className={styles.titleBoxButton} onClick={enterModificationMode}>
                <FaPen className='fontAwesome'/>
            </button>
        );
    };

    const renderSavedQueries = () => {
        return (
            <div className={styles.savedQueriesOuterContainer}>
                <div className={styles.savedQueriesInnerContainer}>
                    <SavedQuery savedQueryName={'Favourites'} onClickSavedQuery={executeSearchFavourites}/>
                    { savedQueries.map((e) => <SavedQuery key={e.id} savedQueryName={e.name} onClickSavedQuery={() => executeSavedQuery(e)}/>)}
                </div>
            </div>
        );
    };

    const renderSavedQueriesList = () => {
        if (savedQueriesListState.modificationMode) {
            return (
                <ModifiableSavedQueriesList/>
            );
        }
        else {
            return (
                <>
                    <div className={styles.titleBoxContainer}>
                        <h3>Saved queries</h3>
                        <div className={styles.titleBoxButtonContainer}>
                            { savedQueriesListState.displaySavedQueries && renderModifyButton() }
                            <button className={styles.titleBoxButton} onClick={toggleDisplaySavedQueries}>
                                { savedQueriesListState.displaySavedQueries
                                    ? <FaAngleDown className='fontAwesome'/>
                                    : <FaAngleRight className='fontAwesome'/> }
                            </button>
                        </div>
                    </div>
                    { savedQueriesListState.displaySavedQueries && renderSavedQueries() }
                </>
            );
        }
    };

    return (
        <SavedQueriesListContext.Provider value={savedQueriesListContextValue}> 
            { renderSavedQueriesList() }
        </SavedQueriesListContext.Provider>
    )
};

export default SavedQueriesList;
