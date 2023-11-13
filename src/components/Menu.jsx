import styles from '../styles/Menu.module.css';
import React from 'react';
import Navigation from './Navigation';
import TagLists from './TagLists';
import Metadata from './Metadata';
import Encrypt from './Encrypt';
import AppState from '../enums/AppState';
import useMenuState from '../hooks/useMenuState';

const Menu = () => {
    const { usedContextValue } = useMenuState();

    const renderImageInfo = () => {
        const img = usedContextValue.imagesToShow[0];

        return (
            <>
                <TagLists img={img}/>
                <Metadata img={img}/>
            </>
        )
    };

    const renderBatchEditorTagList = () => {
        return (
            <>
                <TagLists/>
            </>
        );
    };

    const renderEncryptButton = () => {
        return (
            <>
                <Encrypt/>
            </>
        );
    };

    const renderAdditionalComponents = () => {
        if (usedContextValue.appState === AppState.PREVIEW) {
            return renderImageInfo();
        }

        if (usedContextValue.appState === AppState.BATCH_EDITING) {
            return renderBatchEditorTagList();
        }

        if (usedContextValue.appState === AppState.ENCRYPTOR) {
            return renderEncryptButton();
        }

        return null;
    };

    return (
        <div className={styles.container}>
            <Navigation/>
            { renderAdditionalComponents() }
        </div>
    );
};

export default Menu;
