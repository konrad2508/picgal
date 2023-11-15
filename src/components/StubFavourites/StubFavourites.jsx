import styles from './StubFavourites.module.css';
import React from 'react';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';

const StubFavourites = () => {
    return (
        <div className={styles.stubFavouritesContainer}>
            <h4>Favourites</h4>
            <div className={styles.stubFavouritesButtonContainer}>
                <button className={styles.stubFavouritesButton} disabled={true}>
                    <FaPen className='fontAwesome'/>
                </button>
                <button className={styles.stubFavouritesButton} disabled={true}>
                    <FaRegTrashAlt className='fontAwesome'/>
                </button>
            </div>
        </div>
    );
};

export default StubFavourites;
