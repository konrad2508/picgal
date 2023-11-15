import React from 'react';
import queryService from '../../services/queryService';
import useTagState from './useTagState';

const Tag = ({ tag }) => {
    const { usedContextValue } = useTagState();

    const displayName = queryService.inputTagToNormalTag(tag);

    return (
        <li onClick={() => usedContextValue.onClickTag(tag)}>{displayName}</li>
    );
};

export default Tag;
