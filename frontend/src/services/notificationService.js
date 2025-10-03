import { v4 as uuidv4 } from 'uuid';

const _pluralizer = (counter) => counter === 1 ? '' : 's';

const deletedNotification = (counter) => {
    return {
        id: uuidv4(),
        text: `Deleted ${counter} image` + _pluralizer(counter),
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const restoredPreviewsNotification = (counter) => {
    return {
        id: uuidv4(),
        text: `Restored ${counter} preview` + _pluralizer(counter),
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const restoredSamplesNotification = (counter) => {
    return {
        id: uuidv4(),
        text: `Restored ${counter} sample` + _pluralizer(counter),
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const addedNotification = (counter) => {
    return {
        id: uuidv4(),
        text: `Added ${counter} image` + _pluralizer(counter),
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const noChangesNotification = () => {
    return {
        id: uuidv4(),
        text: 'Database is already up to date',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const failedSyncNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to sync database',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const downloadedImageNotification = (location) => {
    return {
        id: uuidv4(),
        text: `Downloaded file to ${location}`,
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const scanReportNotification = (location) => {
    return {
        id: uuidv4(),
        text: `Finished scanning for duplicates, results in ${location}`,
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const scanFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Scanning for duplicates failed',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const tagModificationSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Tags modified successfully',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const tagModificationFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to modify tags',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const savedQueryModificationSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Saved query modified successfully',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const savedQueryModificationFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to modify saved query',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const savedQueryDeletionSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Saved query deleted successfully',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const savedQueryDeletionFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to delete saved query',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const savedQueryAdditionSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Saved query added successfully',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const savedQueryAdditionFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to add saved query',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const settingsUpdateSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Settings updated successfully',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const settingsUpdateFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to update settings',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const toggleEncryptionSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Encryption toggled successfully',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const toggleEncryptionFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Failed to toggle encryption',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const authenticationSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Authentication successful',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const authenticationFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Authentication failed',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const deauthenticationSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Deauthentication successful',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const batchModificationSuccessfulNotification = () => {
    return {
        id: uuidv4(),
        text: 'Batch tag modification successful',
        colour: 'rgba(0, 255, 0, 0.75)'
    };
};

const batchModificationFailedNotification = () => {
    return {
        id: uuidv4(),
        text: 'Batch tag modification failed',
        colour: 'rgba(255, 0, 0, 0.75)'
    };
};

const noModificationNotification = () => {
    return {
        id: uuidv4(),
        text: 'No modifications specified',
        colour: 'rgba(0, 150, 255, 0.75)'
    };
};

const notificationService = {
    deletedNotification,
    restoredPreviewsNotification,
    restoredSamplesNotification,
    addedNotification,
    noChangesNotification,
    failedSyncNotification,
    downloadedImageNotification,
    scanReportNotification,
    scanFailedNotification,
    tagModificationSuccessfulNotification,
    tagModificationFailedNotification,
    savedQueryModificationSuccessfulNotification,
    savedQueryModificationFailedNotification,
    savedQueryDeletionSuccessfulNotification,
    savedQueryDeletionFailedNotification,
    savedQueryAdditionSuccessfulNotification,
    savedQueryAdditionFailedNotification,
    settingsUpdateSuccessfulNotification,
    settingsUpdateFailedNotification,
    toggleEncryptionSuccessfulNotification,
    toggleEncryptionFailedNotification,
    authenticationSuccessfulNotification,
    authenticationFailedNotification,
    deauthenticationSuccessfulNotification,
    batchModificationSuccessfulNotification,
    batchModificationFailedNotification,
    noModificationNotification
};

export default notificationService;
