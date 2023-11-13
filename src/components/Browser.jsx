import styles from '../styles/Browser.module.css';
import React from 'react';
import UsedQuery from './UsedQuery';
import ImagePreview from './ImagePreview';
import Pager from './Pager';
import useBrowserState from '../hooks/useBrowserState';

const Browser = () => {
    const { usedContextValue } = useBrowserState();

    return (
        <>
            <UsedQuery/>
            <div className={styles.previews}>
                {usedContextValue.imagesToShow.map(img => <ImagePreview key={img.id} img={img}/>)}
            </div>
            <div>
                <Pager/>
            </div>
        </>
    );
};

export default Browser;
