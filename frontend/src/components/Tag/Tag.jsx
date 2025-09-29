import React from 'react';
import queryService from '../../services/queryService';
import useTagState from './useTagState';

const Tag = ({ tag, color }) => {
    const { usedContextValue } = useTagState();

    const displayName = queryService.inputTagToNormalTag(tag);

    return (
        <p onClick={() => usedContextValue.onClickTag(tag)} style={{color: color}}>{displayName}</p>
    );
};

export default Tag;
