import styles from '../styles/ModifiableSavedQuery.module.css';
import React from 'react';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import EditModifiableSavedQuery from './EditModifiableSavedQuery';
import DeleteModifiableSavedQuery from './DeleteModifiableSavedQuery';
import useModifiableSavedQueryState from '../hooks/useModifiableSavedQueryState';
import ModifiableSavedQueryCommand from '../enums/ModifiableSavedQueryCommand.js';
import ModifiableSavedQueriesListContext from './context/ModifiableSavedQueriesListContext';
import AppContext from './context/AppContext';
import ModifiableSavedQueryContext from './context/ModifiableSavedQueryContext';

const ModifiableSavedQuery = ({ savedQuery }) => {
    const { onModifySavedQuery } = React.useContext(AppContext);
    const { canUseSavedQueryName } = React.useContext(ModifiableSavedQueriesListContext);

    const { modifiableSavedQueryState, setModifiableSavedQueryState } = useModifiableSavedQueryState(savedQuery);

    const modifyQuery = () => setModifiableSavedQueryState(ModifiableSavedQueryCommand.MODIFY_QUERY, { canUseSavedQueryName, onModifySavedQuery });
    const cancelModify = () => setModifiableSavedQueryState(ModifiableSavedQueryCommand.CANCEL_MODIFY, { });
    const handleInputNameChange = (event) => setModifiableSavedQueryState(ModifiableSavedQueryCommand.HANDLE_INPUT_NAME_CHANGE, { event });
    const handleInputQueryChange = (event) => setModifiableSavedQueryState(ModifiableSavedQueryCommand.HANDLE_INPUT_QUERY_CHANGE, { event });
    const enableDeletable = () => setModifiableSavedQueryState(ModifiableSavedQueryCommand.ENABLE_DELETABLE, { });
    const disableDeletable = () => setModifiableSavedQueryState(ModifiableSavedQueryCommand.DISABLE_DELETABLE, { });
    const enableModifiable = () => setModifiableSavedQueryState(ModifiableSavedQueryCommand.ENABLE_MODIFIABLE, { });

    const modifiableSavedQueryContextValue = {
        inputName: modifiableSavedQueryState.inputName,
        inputQuery: modifiableSavedQueryState.inputQuery,
        handleInputNameChange,
        handleInputQueryChange,
        modifyQuery,
        cancelModify,
        disableDeletable
    };

    if (modifiableSavedQueryState.modifiable) {
        return (
            <ModifiableSavedQueryContext.Provider value={modifiableSavedQueryContextValue}>
                <EditModifiableSavedQuery/>
            </ModifiableSavedQueryContext.Provider>
        );
    }

    if (modifiableSavedQueryState.deletable) {
        return (
            <ModifiableSavedQueryContext.Provider value={modifiableSavedQueryContextValue}>
                <DeleteModifiableSavedQuery savedQuery={savedQuery}/>
            </ModifiableSavedQueryContext.Provider>
        );
    }

    return (
        <div className={styles.savedQueryContainer}>
            <h4>{savedQuery.name}</h4>
            <div className={styles.savedQueryButtonContainer}>
                <button onClick={enableModifiable}>
                    <FaPen className='fontAwesome'/>
                </button>
                <button onClick={enableDeletable}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default ModifiableSavedQuery;