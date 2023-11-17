import styles from './Image.module.css';
import React from 'react';
import networkService from '../../services/networkService';
import useImageState from './useImageState';

const Image = ({ img }) => {
    const { contextValue } = useImageState();

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

    const imageUrl = () => {
        const url = contextValue.showOriginal ? img.path : img.sample;

        return networkService.getURLToBackend(url);
    };

    return (
        <div className={styles.container}>
            <div>
                <button onClick={contextValue.toggleShowOriginal} className={styles.button}>
                    { contextValue.showOriginal ? 'Show sample' : 'Show original' }
                </button>
            </div>
            <div>
                <img
                    className={styles.img}
                    src={imageUrl()}
                    alt={img.path}
                    style={styleImg}
                    title=' '
                />
            </div>
        </div>
    );
};

export default Image;
