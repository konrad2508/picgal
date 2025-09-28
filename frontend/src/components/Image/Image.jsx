import styles from './Image.module.css';
import React from 'react';
import networkService from '../../services/networkService';
import useImageState from './useImageState';

const Image = ({ img }) => {
    const { usedContextValue } = useImageState();

    const url = usedContextValue.showOriginal ? img.path : img.sample;

    return (
        <div className={styles.center}>
            <div className={styles.box}>
                <div className={styles.center}>
                    <img
                        className={`${styles.img} image-imgMaxHeight`}
                        src={networkService.getURLToBackend(url)}
                        alt={url}
                        title=' '
                    />
                </div>
            </div>
        </div>
    );
};

export default Image;
