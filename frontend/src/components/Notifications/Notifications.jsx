import styles from './Notifications.module.css';
import React from 'react';
import useNotificationsState from './useNotificationsState';

const Notifications = () => {
    const { usedContextValue } = useNotificationsState();

    return (
        <div className={styles.notificationsContainer}>
            { usedContextValue.notifications.map((notif, i) => (
                <div key={i} className={styles.notification} style={{backgroundColor: notif.colour}} onClick={() => usedContextValue.onClickNotification(notif.id)}>
                    {notif.text}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
