import styles from '../styles/TagListsTitleBar.module.css';
import React from 'react';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';
import ModificationMode from '../enums/ModificationMode';
import TagListsContext from './context/TagListsContext';

const TagListsTitleBar = () => {
    const { modificationMode, changeModificationMode } = React.useContext(TagListsContext);

    if (modificationMode) {
        return (
            <div className={styles.container}>
                <h2>Tags</h2>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => changeModificationMode(ModificationMode.SEND)}
                    >
                        <FaSave className='fontAwesome'/>
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => changeModificationMode(ModificationMode.CANCEL)}
                    >
                        <FaTimes className='fontAwesome'/>
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
                        <FaPen className='fontAwesome'/>
                    </button>
                </div>
            </div>
        );
    }
};

export default TagListsTitleBar;
