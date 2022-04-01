import styles from '../styles/Content.module.css';
import React from 'react';
import ImagePreview from './ImagePreview';
import Image from './Image';
import UsedQuery from './UsedQuery';
import Pager from './Pager';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const Content = () => {
    const { imagesToShow, appState } = React.useContext(AppContext);

    if (appState === AppState.BROWSING) {
        return (
            <div className={styles.container}>
                <UsedQuery/>
                <div className={styles.previews}>
                    {imagesToShow.map(img => <ImagePreview key={img.id} img={img}/>)}
                </div>
                <div>
                    <Pager/>
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
