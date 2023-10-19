import styles from '../styles/ModifiableSavedQueriesList.module.css';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import ModifiableSavedQuery from './ModifiableSavedQuery';
import AddNewSavedQuery from './AddNewSavedQuery';
import StubFavourites from './StubFavourites';
import useModifiableSavedQueriesListState from '../hooks/useModifiableSavedQueriesListState';
import ModifiableSavedQueriesListContext from './context/ModifiableSavedQueriesListContext';

const ModifiableSavedQueriesList = () => {
    const { usedContextValue, contextValue } = useModifiableSavedQueriesListState();

    return (
        <ModifiableSavedQueriesListContext.Provider value={contextValue}>
            <div className={styles.titleBoxContainer}>
                <h3>Saved queries</h3>
                <div className={styles.titleBoxButtonContainer}>
                    <button
                        className={styles.titleBoxButton}
                        onClick={contextValue.startAddingSavedQuery}
                        disabled={contextValue.addingSavedQuery}
                    >
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button className={styles.titleBoxButton} onClick={usedContextValue.exitModificationMode}>
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>

            <div className={styles.savedQueriesOuterContainer}>
                <div className={styles.savedQueriesInnerContainer}>
                    { contextValue.addingSavedQuery && <AddNewSavedQuery/> }

                    <StubFavourites/>
                    { usedContextValue.savedQueries.map((e) => <ModifiableSavedQuery key={e.id} savedQuery={e}/>)}
                </div>
            </div>
        </ModifiableSavedQueriesListContext.Provider>
    );
};

export default ModifiableSavedQueriesList;
