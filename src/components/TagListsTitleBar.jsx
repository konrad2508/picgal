import styles from '../styles/TagListsTitleBar.module.css';
import React from 'react';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';
import ModificationMode from '../enums/ModificationMode';
import TagListsContext from './context/TagListsContext';
import AppContext from './context/AppContext';
import AppState from '../enums/AppState';

const TagListsTitleBar = () => {
    const { appState } = React.useContext(AppContext);

    const { modificationMode, changeModificationMode, changeModificationModeInBatchEditor } = React.useContext(TagListsContext);

    const onClickHandler = (mode) => {
        if (appState === AppState.BATCH_EDITING) {
            changeModificationModeInBatchEditor(mode);
        }
        else {
            changeModificationMode(mode);
        }
    };

    if (modificationMode || appState === AppState.BATCH_EDITING) {
        return (
            <div className={styles.container}>
                <h2>Tags</h2>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => onClickHandler(ModificationMode.SEND)}
                    >
                        <FaSave className='fontAwesome'/>
                    </button>
                    { appState !== AppState.BATCH_EDITING && <button
                        className={styles.button}
                        onClick={() => onClickHandler(ModificationMode.CANCEL)}
                    >
                        <FaTimes className='fontAwesome'/>
                    </button> }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={styles.container}>
                <h2>Tags</h2>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => onClickHandler(ModificationMode.START)}
                    >
                        <FaPen className='fontAwesome'/>
                    </button>
                </div>
            </div>
        );
    }
};

export default TagListsTitleBar;
