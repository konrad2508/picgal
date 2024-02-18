import styles from './Metadata.module.css';
import React from 'react';
import { FaHeart, FaRegHeart, FaExpand, FaCompress } from 'react-icons/fa';
import modificationForm from '../../forms/modificationForm';
import useMetadataState from './useMetadataState';

const Metadata = ({ img }) => {
    const { usedContextValue } = useMetadataState();

    const { form: modificationsForm } = modificationForm();
    modificationsForm.toggleFavourite = true;

    const flipFavourite = () => usedContextValue.onSaveModifiedTagsClick(img.id, modificationsForm);
    const flipShowOriginal = () => usedContextValue.onToggleShowOriginal();

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2>Metadata</h2>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={flipShowOriginal}>
                        {usedContextValue.showOriginal ? <FaExpand className='fontAwesome'/> : <FaCompress className='fontAwesome'/>}
                    </button>
                    <button className={styles.button} onClick={flipFavourite}>
                        {img.favourite ? <FaHeart className='fontAwesome'/> : <FaRegHeart className='fontAwesome'/>}
                    </button>
                </div>
            </div>
            <p><b>ID:</b> {img.id}</p>
            <p><b>Encrypted:</b> {img.encrypted ? 'Yes' : 'No'}</p>
            <p><b>Resolution:</b> {img.width}x{img.height}</p>
            <p><b>Created at:</b> {img.createdTime}</p>
            <p><b>Location:</b> {img.file}</p>
        </div>
    );
};

export default Metadata;
