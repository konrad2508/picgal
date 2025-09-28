import styles from './Pager.module.css';
import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import AppState from '../../enums/AppState';
import usePagerState from './usePagerState';

const Pager = () => {
    const { usedContextValue } = usePagerState();

    const onClick = (newPage) => {
        if (AppState.isMultiselect(usedContextValue.appState)) {
            usedContextValue.onPageNavClickInMultiselect(newPage);
        }
        else {
            usedContextValue.onPageNavClick(newPage);
        }
    };

    const validator = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const onFocus = (_) => setTimeout(() => document.execCommand('selectAll', false, null), 0);

    const onBlur = (e) => {
        const inputtedValue = parseInt(e.currentTarget.innerHTML);

        if (inputtedValue === usedContextValue.pageNumber) {
            return;
        }

        if (inputtedValue < 1 || inputtedValue > usedContextValue.maxPage || isNaN(inputtedValue)) {
            e.currentTarget.innerHTML = usedContextValue.pageNumber;
        }
        else {
            onClick(inputtedValue);
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

            <div className={styles.pageCounter}>
                <div contentEditable={true} className={styles.currentPage} onKeyPress={validator} onFocus={onFocus} onBlur={onBlur}>
                    {usedContextValue.pageNumber}
                </div>
                <p>/</p>
                <p className={styles.maxPage}>{usedContextValue.maxPage}</p>
            </div>

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
