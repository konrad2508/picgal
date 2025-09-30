import styles from './Content.module.css';
import React from 'react';
import Browser from '../Browser/Browser';
import Image from '../Image/Image';
import DuplicatesScanner from '../DuplicatesScanner/DuplicatesScanner';
import Settings from '../Settings/Settings';
import ToolsSelection from '../ToolsSelection/ToolsSelection';
import Multiselect from '../Multiselect/Multiselect';
import AppState from '../../enums/AppState';
import useContentState from './useContentState';

const Content = () => {
    const { usedContextValue } = useContentState();

    let content = null;

    if (usedContextValue.appState === AppState.BROWSING) {
        content = (
            <div className={styles.content}>
                <Browser/>
            </div>
        );
    }
    else if ([AppState.BATCH_TAG_EDITOR, AppState.ENCRYPTOR].includes(usedContextValue.appState)) {
        content = (
            <div className={styles.content}>
                <Multiselect/>
            </div>
        );
    }
    else if (usedContextValue.appState === AppState.PREVIEW) {
        content = (
            <div className={styles.conterCenter}>
                <Image img={usedContextValue.imagesToShow[0]}/>
            </div>
        );
    }
    else if (usedContextValue.appState === AppState.START) {
        content = (
            <div className={styles.conterCenter}>
                <ToolsSelection/>
            </div>
        );
    }
    else if (usedContextValue.appState === AppState.SETTINGS) {
        content = (
            <div className={styles.conterCenter}>
                <Settings/>
            </div>
        );
    }
    else if (usedContextValue.appState === AppState.DUPLICATES_SCANNER) {
        content = (
            <div className={styles.conterCenter}>
                <DuplicatesScanner/>
            </div>
        );
    }

    return (
        <>
            { content }
        </>
    );
};

export default Content;
