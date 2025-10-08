import styles from './SavedQuery.module.css';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const SavedQuery = ({ savedQueryName, onClickSavedQuery }) => {
    return (
        <div className={styles.savedQueryContainer}>
            <p className={styles.savedQuery} title={savedQueryName}>{savedQueryName}</p>
            <div className={styles.savedQueryButtonContainer}>
                <button className={styles.button} onClick={onClickSavedQuery}>
                    <FaArrowRight className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default SavedQuery;
