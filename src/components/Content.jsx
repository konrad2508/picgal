import styles from '../styles/Content.module.css';
import React from 'react';
import Image from './Image';
import Settings from './Settings';
import ToolsSelection from './ToolsSelection';
import BatchSelect from './BatchSelect';
import Notifications from './Notifications';
import AppState from '../enums/AppState';
import useContentState from '../hooks/useContentState';
import Browser from './Browser';

const Content = () => {
    const { usedContextValue } = useContentState();

    let content = null;

    if (usedContextValue.appState === AppState.BROWSING) {
        content = (
            <>
                <Browser/>
            </>
        );
    }
    else if (usedContextValue.appState === AppState.BATCH_EDITING) {
        content = (
            <>
                <BatchSelect title='Batch Tag Editor'/>
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
    else if (usedContextValue.appState === AppState.ENCRYPTOR) {
        content = (
            <>
                <BatchSelect title='Encryptor'/>
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
