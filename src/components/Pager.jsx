import styles from '../styles/Pager.module.css'
import React from 'react';

const Pager = ({ pageNumber, maxPage, onPageNavClick }) => {
    return (
        <div className={styles.container}>
            <button onClick={() => onPageNavClick(-1)} disabled={pageNumber === 1}>{'<'}</button>
            <p className={styles.pageNumber}>{pageNumber} / {maxPage}</p>
            <button onClick={() => onPageNavClick(1)} disabled={pageNumber === maxPage}>{'>'}</button>
        </div>
    )
}

export default Pager;
