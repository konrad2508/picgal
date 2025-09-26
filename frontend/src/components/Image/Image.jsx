import styles from './Image.module.css';
import React from 'react';
import networkService from '../../services/networkService';
import useImageState from './useImageState';

const Image = ({ img }) => {
    const { usedContextValue } = useImageState();

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

    const url = usedContextValue.showOriginal ? img.path : img.sample;

    const styleImg = {
        maxWidth: newWidth,
        maxHeight: newHeight
    };

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <img
                    className={styles.img}
                    src={networkService.getURLToBackend(url)}
                    alt={url}
                    style={styleImg}
                    title=' '
                />
            </div>
        </div>
    );
};

export default Image;
