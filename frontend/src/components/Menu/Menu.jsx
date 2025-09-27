import styles from './Menu.module.css';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import Notifications from '../Notifications/Notifications';
import TagLists from '../TagLists/TagLists';
import Title from '../Title/Title';
import Metadata from '../Metadata/Metadata';
import MultiselectCount from '../MultiselectCount/MultiselectCount';
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
                <div className={styles.boxIn}>
                    <TagLists img={img}/>
                </div>
                <div className={styles.boxIn}>
                    <Metadata img={img}/>
                </div>
                <div className={styles.boxIn}>
                    <SaveImage id={img.id}/>
                </div>
            </>
        );
    };

    const renderBatchTagEditorTagList = () => {
        return (
            <>
                <div className={styles.boxIn}>
                    <MultiselectCount/>
                </div>
                <div className={styles.boxIn}>
                    <TagLists/>
                </div>
            </>
        );
    };

    const renderEncryptButton = () => {
        return (
            <>
                <div className={styles.boxIn}>
                    <MultiselectCount/>
                </div>
                <div className={styles.boxIn}>
                    <Encrypt/>
                </div>
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
        <div className={styles.boxOut}>
            <div className={styles.container}>
                <div className={styles.boxIn}>
                    <Title/>
                </div>
                <div className={styles.boxIn}>
                    <Navigation/>
                </div>
                { renderAdditionalComponents() }
                <div className={styles.notifications}>
                    <Notifications/>
                </div>
            </div>
        </div>
    );
};

export default Menu;
