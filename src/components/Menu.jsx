import styles from '../styles/Menu.module.css';
import React from 'react';
import Navigation from './Navigation';
import TagLists from './TagLists';
import Metadata from './Metadata';
import AppState from '../enums/AppState';
import AppContext from './context/AppContext';

const Menu = () => {
    const { appState, imagesToShow } = React.useContext(AppContext);

    const renderImageInfo = () => {
        const img = imagesToShow[0];

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

    const renderAdditionalComponents = () => {
        if (appState === AppState.PREVIEW) {
            return renderImageInfo();
        }

        if (appState === AppState.BATCH_EDITING) {
            return renderBatchEditorTagList();
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
