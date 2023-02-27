import styles from '../styles/Content.module.css';
import React from 'react';
import ImagePreview from './ImagePreview';
import Image from './Image';
import UsedQuery from './UsedQuery';
import Pager from './Pager';
import ToolsSelection from './ToolsSelection';
import Notifications from './Notifications';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const Content = () => {
    const { imagesToShow, appState } = React.useContext(AppContext);

    let content = null;

    if (appState === AppState.BROWSING) {
        content = (
            <>
                <UsedQuery/>
                <div className={styles.previews}>
                    {imagesToShow.map(img => <ImagePreview key={img.id} img={img}/>)}
                </div>
                <div>
                    <Pager/>
                </div>
            </>
        );
    }
    else if (appState === AppState.PREVIEW) {
        content = (
            <>
                <Image img={imagesToShow[0]}/>
            </>
        );
    }
    else if (appState === AppState.START) {
        content = (
            <>
                <ToolsSelection/>
            </>
        );
    }

    return (
        <div className={styles.container}>
            <Notifications/>
            { content }
        </div>
    );
};

export default Content;
