import styles from './Notifications.module.css';
import React from 'react';
import useNotificationsState from './useNotificationsState';

const Notifications = () => {
    const { usedContextValue } = useNotificationsState();

    return (
        <>
            { usedContextValue.notifications.map((_, i, a) => (
                <div
                    key={i}
                    className={styles.notification}
                    style={{backgroundColor: a[a.length - 1 - i].colour}}
                    onClick={() => usedContextValue.onClickNotification(a[a.length - 1 - i].id)}
                >
                    {a[a.length - 1 - i].text}
                </div>
            ))}
        </>
    );
};

export default Notifications;
