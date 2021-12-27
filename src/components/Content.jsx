import styles from '../styles/Content.module.css';
import React from 'react';
import ImagePreview from './ImagePreview';
import Image from './Image';
import UsedQuery from './UsedQuery';
import Pager from './Pager';
import AppState from '../enums/AppState';

const Content = ({ usedQuery, imagesToShow, appState, onImagePreviewClick, pageNumber, maxPage, onPageNavClick }) => {
    if (appState === AppState.BROWSING) {
        return (
            <div className={styles.container}>
                <UsedQuery usedQuery={usedQuery}/>
                <div className={styles.previews}>
                    {imagesToShow.map(img => <ImagePreview key={img.id} img={img} onClick={onImagePreviewClick}/>)}
                </div>
                <div>
                    <Pager pageNumber={pageNumber} maxPage={maxPage} onPageNavClick={onPageNavClick}/>
                </div>
            </div>
        );
    }
    else if (appState === AppState.PREVIEW) {
        return (
            <div className={styles.container}>
                <Image img={imagesToShow[0]}/>
            </div>
        );
    }
    else {
        return null;
    }
};

export default Content;
