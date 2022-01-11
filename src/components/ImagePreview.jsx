import styles from '../styles/ImagePreview.module.css';
import React from 'react';

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

    const imgSource = `http://127.0.0.1:3001${img.preview}`;

    return (
        <div className={styles.container}>
            <img
                src={imgSource}
                alt={img.preview}
                width={newWidth}
                height={newHeight}
                onClick={() => onClick(img)}
            />
        </div>
    );
};
 
export default ImagePreview;
