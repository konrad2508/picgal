import styles from '../styles/TagListsTitleBar.module.css'
import React from 'react';
import ModificationMode from '../enums/ModificationMode';

const TagListsTitleBar = ({ modificationMode, changeModificationMode }) => {
    if (modificationMode) {
        return (
            <div className={styles.container}>
                <h2>Tags</h2>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => changeModificationMode(ModificationMode.SEND)}
                    >
                        +
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => changeModificationMode(ModificationMode.CANCEL)}
                    >
                        -
                    </button>
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
                        onClick={() => changeModificationMode(ModificationMode.START)}
                    >
                        M
                    </button>
                </div>
            </div>
        );
    }
};

export default TagListsTitleBar;
