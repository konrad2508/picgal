import React from 'react';
import queryService from '../services/queryService';

const Tag = ({ tag, onClickTag }) => {
    const displayName = queryService.inputTagToNormalTag(tag);

    return (
        <li onClick={() => onClickTag(tag)}>{displayName}</li>
    );
};

export default Tag;
