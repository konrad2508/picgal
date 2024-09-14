import React from 'react';
import AppContext from '../../context/AppContext';

const useNotificationsState = () => {
    const {
        notifications,
        onClickNotification
    } = React.useContext(AppContext);

    const usedContextValue = {
        notifications,
        onClickNotification
    };

    return {
        usedContextValue
    };
};

export default useNotificationsState;