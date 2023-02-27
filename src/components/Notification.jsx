import styles from '../styles/Notification.module.css';
import React from 'react';

const Notification = ({ text }) => {
    return (
        <div className={styles.container}>
            <p>{text}</p>
        </div>
    );
};

export default Notification;
