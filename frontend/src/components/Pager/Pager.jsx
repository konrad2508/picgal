import styles from './Pager.module.css';
import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import AppState from '../../enums/AppState';
import usePagerState from './usePagerState';

const Pager = () => {
    const { usedContextValue } = usePagerState();

    const onClick = (newPage) => {
        if ([AppState.BATCH_EDITING, AppState.ENCRYPTOR].includes(usedContextValue.appState)) {
            usedContextValue.onPageNavClickInBatchEditor(newPage);
        }
        else {
            usedContextValue.onPageNavClick(newPage);
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => onClick(1)} disabled={usedContextValue.pageNumber === 1}>
                <FaAngleDoubleLeft className='fontAwesome'/>
            </button>

            <button onClick={() => onClick(usedContextValue.pageNumber - 1)} disabled={usedContextValue.pageNumber === 1}>
                <FaAngleLeft className='fontAwesome'/>
            </button>

            <p className={styles.pageNumber}>{usedContextValue.pageNumber} / {usedContextValue.maxPage}</p>
            
            <button onClick={() => onClick(usedContextValue.pageNumber + 1)} disabled={usedContextValue.pageNumber === usedContextValue.maxPage}>
                <FaAngleRight className='fontAwesome'/>
            </button>
            
            <button onClick={() => onClick(usedContextValue.maxPage)} disabled={usedContextValue.pageNumber === usedContextValue.maxPage}>
                <FaAngleDoubleRight className='fontAwesome'/>
            </button>
        </div>
    );
};

export default Pager;
