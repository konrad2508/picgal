import styles from '../styles/Notifications.module.css';
import React from 'react';
import AppContext from './context/AppContext';
import Notification from './Notification';

const Notifications = () => {
    const { deletedCounter, restoredPreviewsCounter, restoredSamplesCounter, addCounter } = React.useContext(AppContext);

    const pluralizer = (counter) => counter === 1 ? '' : 's';

    const deletedCounterNotifText = `Deleted ${deletedCounter} image` + pluralizer(deletedCounter);
    const restoredPreviewsCounterNotifText = `Restored ${restoredPreviewsCounter} preview` + pluralizer(restoredPreviewsCounter);
    const restoredSamplesCounterNotifText = `Restored ${restoredSamplesCounter} sample` + pluralizer(restoredSamplesCounter);
    const addCounterNotifText = `Added ${addCounter} image` + pluralizer(addCounter);
    const noChangesToDatabaseNotifText = 'Database is already up to date';

    return (
        <div className={styles.container}>
            { deletedCounter > 0 && <Notification text={deletedCounterNotifText}/> }
            { restoredPreviewsCounter > 0 && <Notification text={restoredPreviewsCounterNotifText}/> }
            { restoredSamplesCounter > 0 && <Notification text={restoredSamplesCounterNotifText}/> }
            { addCounter > 0 && <Notification text={addCounterNotifText}/> }

            {
                [ deletedCounter, restoredPreviewsCounter, restoredSamplesCounter, addCounter ].every((v) => v === 0) && 
                <Notification text={noChangesToDatabaseNotifText}/>
            }
        </div>
    );
};

export default Notifications;
