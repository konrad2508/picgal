import styles from '../styles/Content.module.css';
import React from 'react';
import ImagePreview from './ImagePreview';
import Image from './Image';
import UsedQuery from './UsedQuery';
import Pager from './Pager';
import Settings from './Settings';
import ToolsSelection from './ToolsSelection';
import Notifications from './Notifications';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const Content = () => {
    const { imagesToShow, appState, batchEditorSelected } = React.useContext(AppContext);

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
    else if (appState === AppState.BATCH_EDITING) {
        content = (
            <>
                <UsedQuery/>
                <div className={styles.previews}>
                    {
                        imagesToShow.map(img => 
                            <ImagePreview key={img.id} img={img} batchEditor={true} selected={batchEditorSelected.some((i) => i.id === img.id)}/>
                        )
                    }
                </div>
                <div>
                    <Pager/>
                </div>
                <h3>Selected images</h3>
                <div className={styles.previews}>
                    {batchEditorSelected.map(img => <ImagePreview key={img.id} img={img} active={false}/>)}
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
    else if (appState === AppState.SETTINGS) {
        content = (
            <>
                <Settings/>
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
