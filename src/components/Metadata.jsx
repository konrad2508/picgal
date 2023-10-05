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
            <p><b>ID:</b> {img.id}</p>
            <p><b>Resolution:</b> {img.width}x{img.height}</p>
            <p><b>Created at:</b> {img.createdTime}</p>
            <p><b>Location:</b> {img.file}</p>
        </div>
    );
};

export default Metadata;
