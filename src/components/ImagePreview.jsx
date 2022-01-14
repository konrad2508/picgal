import styles from '../styles/ImagePreview.module.css';
import React from 'react';
import networkService from '../services/networkService';

const ImagePreview = ({ img, onClick }) => {
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
                onClick={() => onClick(img)}
            />
        </div>
    );
};
 
export default ImagePreview;
