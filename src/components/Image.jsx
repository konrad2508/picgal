import styles from '../styles/Image.module.css';
import React from 'react';
import networkService from '../services/networkService';

const Image = ({ img }) => {
    const MAX_WIDTH = 800;

    const { width, height } = img;

    let newWidth = 0;
    let newHeight = 0;

    if (width > MAX_WIDTH) {
        const diviser = width / MAX_WIDTH;

        newWidth = MAX_WIDTH;
        newHeight = Math.ceil(height / diviser);
    }
    else {
        newWidth = width;
        newHeight = height;
    }

    const styleImg = {
        maxWidth: newWidth,
        maxHeight: newHeight
    };

    return (
        <div className={styles.container}>
            <img
                className={styles.img}
                src={networkService.getURLToBackend(img.path)}
                alt={img.path}
                style={styleImg}
                title=' '
            />
        </div>
    );
};

export default Image;
