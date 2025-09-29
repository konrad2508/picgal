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


const notificationService = {
    deletedNotification,
    restoredPreviewsNotification,
    restoredSamplesNotification,
    addedNotification,
    noChangesNotification,
    downloadedImageNotification,
    scanReportNotification
};

export default notificationService;
