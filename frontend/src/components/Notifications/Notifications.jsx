import styles from './Notifications.module.css';
import React from 'react';
import Notification from '../Notification/Notification';
import useNotificationsState from './useNotificationsState';

const Notifications = () => {
    const { usedContextValue } = useNotificationsState();

    const pluralizer = (counter) => counter === 1 ? '' : 's';

    const deletedCounterNotifText = `Deleted ${usedContextValue.deletedCounter} image` + pluralizer(usedContextValue.deletedCounter);
    const restoredPreviewsCounterNotifText = `Restored ${usedContextValue.restoredPreviewsCounter} preview` + pluralizer(usedContextValue.restoredPreviewsCounter);
    const restoredSamplesCounterNotifText = `Restored ${usedContextValue.restoredSamplesCounter} sample` + pluralizer(usedContextValue.restoredSamplesCounter);
    const addCounterNotifText = `Added ${usedContextValue.addCounter} image` + pluralizer(usedContextValue.addCounter);
    const noChangesToDatabaseNotifText = 'Database is already up to date';

    return (
        <div className={styles.container}>
            { usedContextValue.deletedCounter > 0 && <Notification text={deletedCounterNotifText}/> }
            { usedContextValue.restoredPreviewsCounter > 0 && <Notification text={restoredPreviewsCounterNotifText}/> }
            { usedContextValue.restoredSamplesCounter > 0 && <Notification text={restoredSamplesCounterNotifText}/> }
            { usedContextValue.addCounter > 0 && <Notification text={addCounterNotifText}/> }

            {
                [ usedContextValue.deletedCounter, usedContextValue.restoredPreviewsCounter, usedContextValue.restoredSamplesCounter, usedContextValue.addCounter ].every((v) => v === 0) && 
                <Notification text={noChangesToDatabaseNotifText}/>
            }
        </div>
    );
};

export default Notifications;
