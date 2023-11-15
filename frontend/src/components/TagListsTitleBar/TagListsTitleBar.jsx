import styles from './TagListsTitleBar.module.css';
import React from 'react';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';
import ModificationMode from '../../enums/ModificationMode';
import AppState from '../../enums/AppState';
import useTagListsTitleBarState from './useTagListsTitleBarState';

const TagListsTitleBar = () => {
    const { usedContextValue } = useTagListsTitleBarState();

    const onClickHandler = (mode) => {
        if (usedContextValue.appState === AppState.BATCH_EDITING) {
            usedContextValue.changeModificationModeInBatchEditor(mode);
        }
        else {
            usedContextValue.changeModificationMode(mode);
        }
    };

    if (usedContextValue.modificationMode || usedContextValue.appState === AppState.BATCH_EDITING) {
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
                    { usedContextValue.appState !== AppState.BATCH_EDITING && <button
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
