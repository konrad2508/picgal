import styles from '../styles/Favourites.module.css';
import React from 'react';

const Favourites = ({ onSearchFavouritesClick }) => {
    return (
        <div className={styles.favouritesContainer}>
            <h3>Favourites</h3>
            <div className={styles.favouritesButtonContainer}>
                <button className={styles.favouritesButton} onClick={onSearchFavouritesClick}>Go</button>
            </div>
        </div>
    );
};

export default Favourites;
