import styles from './SaveImage.module.css';
import React from 'react';
import { FaSave } from 'react-icons/fa';
import useSaveImageState from './useSaveImageState';

const SaveImage = ({ id }) => {
    const { contextValue } = useSaveImageState(id);

    return (
        <>
            <h2>Save Image</h2>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <p><b>Save as: </b></p>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} value={contextValue.filename} onChange={contextValue.onFileNameChange}/>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={contextValue.onSaveImage}>
                        <FaSave className='fontAwesome'/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SaveImage;
