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

    return (
        <div className={styles.container}>
            { deletedCounter > 0 && <Notification text={deletedCounterNotifText}/> }
            { restoredPreviewsCounter > 0 && <Notification text={restoredPreviewsCounterNotifText}/> }
            { restoredSamplesCounter > 0 && <Notification text={restoredSamplesCounterNotifText}/> }
            { addCounter > 0 && <Notification text={addCounterNotifText}/> }
        </div>
    );
};

export default Notifications;
