import styles from '../styles/ImagePreview.module.css';
import React from 'react';
import networkService from '../services/networkService';
import AppContext from './context/AppContext';

const ImagePreview = ({ img }) => {
    const { onImagePreviewClick } = React.useContext(AppContext);

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
                onClick={() => onImagePreviewClick(img)}
            />
        </div>
    );
};
 
export default ImagePreview;
