import styles from '../styles/Pager.module.css'
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import AppContext from './context/AppContext';
import AppState from '../enums/AppState';

const Pager = () => {
    const { appState, pageNumber, maxPage, onPageNavClick, onPageNavClickInBatchEditor } = React.useContext(AppContext);

    const onClick = (pageStep) => {
        if (appState === AppState.BATCH_EDITING) {
            onPageNavClickInBatchEditor(pageStep);
        }
        else {
            onPageNavClick(pageStep);
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => onClick(-1)} disabled={pageNumber === 1}>
                <FaAngleLeft className='fontAwesome'/>
            </button>
            <p className={styles.pageNumber}>{pageNumber} / {maxPage}</p>
            <button onClick={() => onClick(1)} disabled={pageNumber === maxPage}>
                <FaAngleRight className='fontAwesome'/>
            </button>
        </div>
    )
}

export default Pager;
