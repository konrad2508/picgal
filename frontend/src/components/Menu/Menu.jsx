import styles from './Menu.module.css';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import TagLists from '../TagLists/TagLists';
import Metadata from '../Metadata/Metadata';
import Encrypt from '../Encrypt/Encrypt';
import SaveImage from '../SaveImage/SaveImage';
import AppState from '../../enums/AppState';
import useMenuState from './useMenuState';

const Menu = () => {
    const { usedContextValue } = useMenuState();

    const renderImageInfo = () => {
        const img = usedContextValue.imagesToShow[0];

        return (
            <>
                <TagLists img={img}/>
                <Metadata img={img}/>
                <SaveImage id={img.id}/>
            </>
        );
    };

    const renderBatchTagEditorTagList = () => {
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

        if (usedContextValue.appState === AppState.BATCH_TAG_EDITOR) {
            return renderBatchTagEditorTagList();
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
