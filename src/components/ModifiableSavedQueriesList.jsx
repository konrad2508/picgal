import styles from '../styles/ModifiableSavedQueriesList.module.css';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import ModifiableSavedQuery from './ModifiableSavedQuery';
import AddNewSavedQuery from './AddNewSavedQuery';
import StubFavourites from './StubFavourites';
import useModifiableSavedQueriesListState from '../hooks/useModifiableSavedQueriesListState';
import ModifiableSavedQueriesListCommand from '../enums/ModifiableSavedQueriesListCommand';
import AppContext from './context/AppContext';
import SavedQueriesListContext from './context/SavedQueriesListContext';
import ModifiableSavedQueriesListContext from './context/ModifiableSavedQueriesListContext';

const ModifiableSavedQueriesList = () => {               
    const { exitModificationMode } = React.useContext(SavedQueriesListContext);
    const { savedQueries, onAddSavedQuery } = React.useContext(AppContext);

    const { modifiableSavedQueriesListState, setModifiableSavedQueriesListState } = useModifiableSavedQueriesListState();
    
    const startAddingSavedQuery = () => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.START_ADDING_SAVED_QUERY, { });
    const handleInputNewName = (event) => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_NAME, { event });
    const handleInputNewQuery = (event) => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_QUERY, { event });
    const addNewSavedQuery = () =>
        setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.ADD_SAVED_QUERY, { canUseSavedQueryName, onAddSavedQuery });
    const cancelAddingSavedQuery = () => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.CANCEL_ADDING_SAVED_QUERY, { });
    
    const canUseSavedQueryName = (id, name) => {
        if (name === '') {
            return false;
        }

        const potentialDuplicate = savedQueries.find((e) => e.name === name && e.id !== id);
        if (potentialDuplicate) {
            return false;
        }

        return true;
    };

    const modifiableSavedQueriesListContextValue = {
        inputNewName: modifiableSavedQueriesListState.inputNewName,
        inputNewQuery: modifiableSavedQueriesListState.inputNewQuery,
        handleInputNewName,
        handleInputNewQuery,
        addNewSavedQuery,
        cancelAddingSavedQuery,
        canUseSavedQueryName
    };

    return (
        <ModifiableSavedQueriesListContext.Provider value={modifiableSavedQueriesListContextValue}>
            <div className={styles.titleBoxContainer}>
                <h3>Saved queries</h3>
                <div className={styles.titleBoxButtonContainer}>
                    <button
                        className={styles.titleBoxButton}
                        onClick={startAddingSavedQuery}
                        disabled={modifiableSavedQueriesListState.addingSavedQuery}
                    >
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button className={styles.titleBoxButton} onClick={exitModificationMode}>
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>

            <div className={styles.savedQueriesOuterContainer}>
                <div className={styles.savedQueriesInnerContainer}>
                    { modifiableSavedQueriesListState.addingSavedQuery && <AddNewSavedQuery/> }

                    <StubFavourites/>
                    { savedQueries.map((e) => <ModifiableSavedQuery key={e.id} savedQuery={e}/>)}
                </div>
            </div>
        </ModifiableSavedQueriesListContext.Provider>
    );
};

export default ModifiableSavedQueriesList;
