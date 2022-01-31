import styles from '../styles/Pager.module.css'
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pager = ({ pageNumber, maxPage, onPageNavClick }) => {
    return (
        <div className={styles.container}>
            <button onClick={() => onPageNavClick(-1)} disabled={pageNumber === 1}>
                <FaAngleLeft className='fontAwesome'/>
            </button>
            <p className={styles.pageNumber}>{pageNumber} / {maxPage}</p>
            <button onClick={() => onPageNavClick(1)} disabled={pageNumber === maxPage}>
                <FaAngleRight className='fontAwesome'/>
            </button>
        </div>
    )
}

export default Pager;
