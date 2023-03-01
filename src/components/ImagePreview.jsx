import styles from '../styles/ImagePreview.module.css';
import React from 'react';
import networkService from '../services/networkService';
import AppContext from './context/AppContext';

const ImagePreview = ({ img, selected=false, active=true, batchEditor=false }) => {
    const { onImagePreviewClick, onClickPreviewInBatchEditor } = React.useContext(AppContext);

    const onClickAction = () => {
        if (!active) {
            return;
        }

        if (batchEditor) {
            onClickPreviewInBatchEditor(img);
        }
        else {
            onImagePreviewClick(img);
        }
    };

    const MAX_DIM = 150;

    const { width, height } = img;

    let newWidth = 0;
    let newHeight = 0;

    if (width > height) {
        const diviser = width / MAX_DIM;
        
        newWidth = MAX_DIM;
        newHeight = Math.ceil(height / diviser);
    }
    else {
        const diviser = height / MAX_DIM;
        
        newWidth = Math.ceil(width / diviser);
        newHeight = MAX_DIM;
    }

    return (
        <div className={styles.container}>
            <img
                src={networkService.getURLToBackend(img.preview)}
                alt={img.preview}
                width={newWidth}
                height={newHeight}
                onClick={onClickAction}
                className={selected ? styles.selected : styles.notSelected}
            />
        </div>
    );
};
 
export default ImagePreview;
