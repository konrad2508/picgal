import React from 'react';

const Tag = ({ tag, onClickTag }) => {
    const displayName = tag.replaceAll('_', ' ');

    return (
        <li onClick={() => onClickTag(tag)}>{displayName}</li>
    );
};

export default Tag;
