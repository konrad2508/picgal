import styles from '../styles/Image.module.css';
import React from 'react';

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

    const imgSource = `http://127.0.0.1:3001${img.path}`;

    return (
        <div className={styles.container}>
            <img
                className={styles.img}
                src={imgSource}
                alt={img.path}
                style={styleImg}
            />
        </div>
    );
};

export default Image;
