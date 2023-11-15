import styles from './SavedQuery.module.css';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const SavedQuery = ({ savedQueryName, onClickSavedQuery }) => {
    return (
        <div className={styles.savedQueryContainer}>
            <h4>{savedQueryName}</h4>
            <div className={styles.savedQueryButtonContainer}>
                <button className={styles.savedQueryButton} onClick={onClickSavedQuery}>
                    <FaArrowRight className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default SavedQuery;
