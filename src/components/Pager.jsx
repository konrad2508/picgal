import styles from '../styles/Pager.module.css'
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import AppState from '../enums/AppState';
import usePagerState from '../hooks/usePagerState';

const Pager = () => {
    const { usedContextValue } = usePagerState();

    const onClick = (pageStep) => {
        if (usedContextValue.appState === AppState.BATCH_EDITING) {
            usedContextValue.onPageNavClickInBatchEditor(pageStep);
        }
        else {
            usedContextValue.onPageNavClick(pageStep);
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => onClick(-1)} disabled={usedContextValue.pageNumber === 1}>
                <FaAngleLeft className='fontAwesome'/>
            </button>
            <p className={styles.pageNumber}>{usedContextValue.pageNumber} / {usedContextValue.maxPage}</p>
            <button onClick={() => onClick(1)} disabled={usedContextValue.pageNumber === usedContextValue.maxPage}>
                <FaAngleRight className='fontAwesome'/>
            </button>
        </div>
    )
}

export default Pager;
