import styles from '../styles/ModifiableSavedQueriesList.module.css';
import React from 'react';
import ModifiableSavedQuery from './ModifiableSavedQuery';
import AddNewSavedQuery from './AddNewSavedQuery';
import useModifiableSavedQueriesListState from '../hooks/useModifiableSavedQueriesListState';
import ModifiableSavedQueriesListCommand from '../enums/ModifiableSavedQueriesListCommand';
import { FaPlus, FaTimes } from 'react-icons/fa';
import StubFavourites from './StubFavourites';

const ModifiableSavedQueriesList = ({ onClickExitEdit,
                                      savedQueries,
                                      onModifySavedQuery,
                                      onDeleteSavedQuery,
                                      onAddSavedQuery,
                                      existingTags }) => {
    const { modifiableSavedQueriesListState, setModifiableSavedQueriesListState } = useModifiableSavedQueriesListState();
    
    const startAddingSavedQuery = () => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.START_ADDING_SAVED_QUERY, { });
    const handleInputNewName = (event) => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_NAME, { event });
    const handleInputNewQuery = (event) => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.HANDLE_INPUT_NEW_QUERY, { event });
    const addNewSavedQuery = () => setModifiableSavedQueriesListState(ModifiableSavedQueriesListCommand.ADD_SAVED_QUERY, { canUseSavedQueryName, onAddSavedQuery });
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

    const renderAddingSavedQuery = () => {
        return (
            <AddNewSavedQuery
                inputNewName={modifiableSavedQueriesListState.inputNewName}
                onInputNewName={handleInputNewName}
                inputNewQuery={modifiableSavedQueriesListState.inputNewQuery}
                onInputNewQuery={handleInputNewQuery}
                existingTags={existingTags}
                onClickAddNewSavedQuery={addNewSavedQuery}
                onClickCancelAddingSavedQuery={cancelAddingSavedQuery}
            />
        );
    };

    return (
        <>
            <div className={styles.titleBoxContainer}>
                <h3>Saved queries</h3>
                <div className={styles.titleBoxButtonContainer}>
                    <button className={styles.titleBoxButton} onClick={startAddingSavedQuery} disabled={modifiableSavedQueriesListState.addingSavedQuery}>
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button className={styles.titleBoxButton} onClick={onClickExitEdit}>
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>

            <div className={styles.savedQueriesOuterContainer}>
                <div className={styles.savedQueriesInnerContainer}>
                    { modifiableSavedQueriesListState.addingSavedQuery && renderAddingSavedQuery() }

                    <StubFavourites/>

                    { savedQueries.map((e) => <ModifiableSavedQuery
                        key={e.id} savedQuery={e}
                        onModifySavedQuery={onModifySavedQuery}
                        onDeleteSavedQuery={onDeleteSavedQuery}
                        existingTags={existingTags}
                        canUseSavedQueryName={canUseSavedQueryName}
                    />)}
                </div>
            </div>
        </>
    );
};

export default ModifiableSavedQueriesList;
