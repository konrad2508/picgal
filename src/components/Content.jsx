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
import useContentState from '../hooks/useContentState';

const Content = () => {
    const { usedContextValue } = useContentState();

    let content = null;

    if (usedContextValue.appState === AppState.BROWSING) {
        content = (
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
    }
    else if (usedContextValue.appState === AppState.BATCH_EDITING) {
        content = (
            <>
                <UsedQuery/>
                <div className={styles.previews}>
                    {
                        usedContextValue.imagesToShow.map(img => 
                            <ImagePreview key={img.id} img={img} batchEditor={true} selected={usedContextValue.batchEditorSelected.some((i) => i.id === img.id)}/>
                        )
                    }
                </div>
                <div>
                    <Pager/>
                </div>
                <h3>Selected images</h3>
                <div className={styles.previews}>
                    {usedContextValue.batchEditorSelected.map(img => <ImagePreview key={img.id} img={img} active={false}/>)}
                </div>
            </>
        );
    }
    else if (usedContextValue.appState === AppState.PREVIEW) {
        content = (
            <>
                <Image img={usedContextValue.imagesToShow[0]}/>
            </>
        );
    }
    else if (usedContextValue.appState === AppState.START) {
        content = (
            <>
                <ToolsSelection/>
            </>
        );
    }
    else if (usedContextValue.appState === AppState.SETTINGS) {
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
