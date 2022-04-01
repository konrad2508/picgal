import React from 'react';
import queryService from '../services/queryService';
import AppContext from './context/AppContext';

const Tag = ({ tag }) => {
    const { onClickTag } = React.useContext(AppContext);

    const displayName = queryService.inputTagToNormalTag(tag);

    return (
        <li onClick={() => onClickTag(tag)}>{displayName}</li>
    );
};

export default Tag;
