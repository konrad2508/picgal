import styles from './Content.module.css';
import React from 'react';
import Browser from '../Browser/Browser';
import Image from '../Image/Image';
import DuplicatesScanner from '../DuplicatesScanner/DuplicatesScanner';
import Settings from '../Settings/Settings';
import ToolsSelection from '../ToolsSelection/ToolsSelection';
import Multiselect from '../Multiselect/Multiselect';
import Notifications from '../Notifications/Notifications';
import AppState from '../../enums/AppState';
import useContentState from './useContentState';

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
    else if (usedContextValue.appState === AppState.BATCH_TAG_EDITOR) {
        content = (
            <>
                <Multiselect/>
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
    else if (usedContextValue.appState === AppState.DUPLICATES_SCANNER) {
        content = (
            <>
                <DuplicatesScanner/>
            </>
        );
    }
    else if (usedContextValue.appState === AppState.ENCRYPTOR) {
        content = (
            <>
                <Multiselect/>
            </>
        );
    }

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <Notifications/>
                { content }
            </div>
        </div>
    );
};

export default Content;
