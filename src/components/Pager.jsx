import styles from '../styles/Pager.module.css'
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import AppContext from './context/AppContext';

const Pager = () => {
    const { pageNumber, maxPage, onPageNavClick } = React.useContext(AppContext);

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
