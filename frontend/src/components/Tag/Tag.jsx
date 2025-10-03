import styles from './Tag.module.css';
import React from 'react';
import queryService from '../../services/queryService';
import useTagState from './useTagState';

const Tag = ({ tag, color }) => {
    const { usedContextValue } = useTagState();

    const displayName = queryService.inputTagToNormalTag(tag);

    return (
        <div className={styles.container}>
            <p className={styles.tag} onClick={() => usedContextValue.onClickTag(tag)} style={{color: color}}>{displayName}</p>
        </div>
    );
};

export default Tag;
