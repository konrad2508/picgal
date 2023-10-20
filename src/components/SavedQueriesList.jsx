import styles from '../styles/SavedQueriesList.module.css';
import React from 'react';
import { FaAngleRight, FaAngleDown, FaPen } from 'react-icons/fa';
import SavedQuery from './SavedQuery';
import ModifiableSavedQueriesList from './ModifiableSavedQueriesList';
import useSavedQueriesListState from '../hooks/useSavedQueriesListState';
import SavedQueriesListContext from './context/SavedQueriesListContext';
import AppState from '../enums/AppState';

const SavedQueriesList = () => {
    const { usedContextValue, contextValue } = useSavedQueriesListState();

    const renderModifyButton = () => {
        return (
            <button className={styles.titleBoxButton} onClick={contextValue.enterModificationMode}>
                <FaPen className='fontAwesome'/>
            </button>
        );
    };

    const renderSavedQueries = () => {
        return (
            <div className={styles.savedQueriesOuterContainer}>
                <div className={styles.savedQueriesInnerContainer}>
                    <SavedQuery
                        savedQueryName={'Favourites'}
                        onClickSavedQuery={
                            usedContextValue.appState === AppState.BATCH_EDITING
                                ? contextValue.executeSearchFavouritesInBatchEditor
                                : contextValue.executeSearchFavourites
                        }
                    />
                    {
                        usedContextValue.savedQueries.map((e) =>
                            <SavedQuery 
                                key={e.id}
                                savedQueryName={e.name}
                                onClickSavedQuery={
                                    () => usedContextValue.appState === AppState.BATCH_EDITING
                                        ? contextValue.executeSavedQueryInBatchEditor(e)
                                        : contextValue.executeSavedQuery(e)
                                }
                            />
                        )
                    }
                </div>
            </div>
        );
    };

    const renderSavedQueriesList = () => {
        if (contextValue.modificationMode) {
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
                            { contextValue.displaySavedQueries && renderModifyButton() }
                            <button className={styles.titleBoxButton} onClick={contextValue.toggleDisplaySavedQueries}>
                                { contextValue.displaySavedQueries
                                    ? <FaAngleDown className='fontAwesome'/>
                                    : <FaAngleRight className='fontAwesome'/> }
                            </button>
                        </div>
                    </div>
                    { contextValue.displaySavedQueries && renderSavedQueries() }
                </>
            );
        }
    };

    return (
        <SavedQueriesListContext.Provider value={contextValue}> 
            { renderSavedQueriesList() }
        </SavedQueriesListContext.Provider>
    )
};

export default SavedQueriesList;
