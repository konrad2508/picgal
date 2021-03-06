import styles from '../styles/Metadata.module.css';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import modificationForm from '../forms/modificationForm';
import AppContext from './context/AppContext';

const Metadata = ({ img }) => {
    const { onSaveModifiedTagsClick } = React.useContext(AppContext);

    const { form: modificationsForm } = modificationForm();
    modificationsForm.toggleFavourite = true;

    const flipFavourite = () => onSaveModifiedTagsClick(img.id, modificationsForm);

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2>Metadata</h2>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={flipFavourite}
                    >
                        {img.favourite ? <FaHeart className='fontAwesome'/> : <FaRegHeart className='fontAwesome'/>}
                    </button>
                </div>
            </div>
            <p>ID: {img.id}</p>
            <p>Resolution: {img.width}x{img.height}</p>
            <p>Created at: {img.createdTime}</p>
            <p>Source: {img.file}</p>
        </div>
    );
};

export default Metadata;
