import styles from './Browser.module.css';
import React from 'react';
import UsedQuery from '../UsedQuery/UsedQuery';
import ImagePreview from '../ImagePreview/ImagePreview';
import Pager from '../Pager/Pager';
import useBrowserState from './useBrowserState';

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
