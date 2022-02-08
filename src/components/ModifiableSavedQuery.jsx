import styles from '../styles/ModifiableSavedQuery.module.css';
import React from 'react';
import useModifiableSavedQueryState from '../hooks/useModifiableSavedQueryState';
import ModifiableSavedQueryCommand from '../enums/ModifiableSavedQueryCommand.js';
import EditModifiableSavedQuery from './EditModifiableSavedQuery';
import DeleteModifiableSavedQuery from './DeleteModifiableSavedQuery';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';

const ModifiableSavedQuery = ({ savedQuery, onModifySavedQuery, onDeleteSavedQuery, existingTags, canUseSavedQueryName }) => {
    const { modifiableSavedQueryState, setModifiableSavedQueryState } = useModifiableSavedQueryState(savedQuery);

    const modifyQuery            = ()      => setModifiableSavedQueryState(ModifiableSavedQueryCommand.MODIFY_QUERY, { canUseSavedQueryName, onModifySavedQuery });
    const cancelModify           = ()      => setModifiableSavedQueryState(ModifiableSavedQueryCommand.CANCEL_MODIFY, { });
    const handleInputNameChange  = (event) => setModifiableSavedQueryState(ModifiableSavedQueryCommand.HANDLE_INPUT_NAME_CHANGE, { event });
    const handleInputQueryChange = (event) => setModifiableSavedQueryState(ModifiableSavedQueryCommand.HANDLE_INPUT_QUERY_CHANGE, { event });
    const enableDeletable        = ()      => setModifiableSavedQueryState(ModifiableSavedQueryCommand.ENABLE_DELETABLE, { });
    const disableDeletable       = ()      => setModifiableSavedQueryState(ModifiableSavedQueryCommand.DISABLE_DELETABLE, { });
    const enableModifiable       = ()      => setModifiableSavedQueryState(ModifiableSavedQueryCommand.ENABLE_MODIFIABLE, { });

    if (modifiableSavedQueryState.modifiable) {
        return (
            <EditModifiableSavedQuery
                inputName={modifiableSavedQueryState.inputName}
                onInputName={handleInputNameChange}
                inputQuery={modifiableSavedQueryState.inputQuery}
                onInputQuery={handleInputQueryChange}
                existingTags={existingTags}
                onClickModifyQuery={modifyQuery}
                onClickCancelModify={cancelModify}
            />
        );
    }

    if (modifiableSavedQueryState.deletable) {
        return (
            <DeleteModifiableSavedQuery
                savedQueryName={savedQuery.name}
                onClickDelete={() => onDeleteSavedQuery(savedQuery.id)}
                onClickDisableDeletable={disableDeletable}
            />
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