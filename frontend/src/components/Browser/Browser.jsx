import styles from './Browser.module.css';
import React from 'react';
import Count from '../Count/Count';
import UsedQuery from '../UsedQuery/UsedQuery';
import ImagePreview from '../ImagePreview/ImagePreview';
import Pager from '../Pager/Pager';
import useBrowserState from './useBrowserState';

const Browser = () => {
    const { usedContextValue } = useBrowserState();

    return (
        <>
            <div className={styles.box}>
                <UsedQuery/>
                <Count/>
            </div>
            <div className={styles.boxPreviews}>
                <div className={styles.previews}>
                    {usedContextValue.imagesToShow.map(img => <ImagePreview key={img.id} img={img}/>)}
                </div>
                <div className={styles.pager}>
                    <Pager/>
                </div>
            </div>
        </>
    );
};

export default Browser;
