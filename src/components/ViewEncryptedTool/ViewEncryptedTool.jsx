import React from 'react';
import ViewEncrypted from '../../enums/ViewEncrypted';
import useViewEncryptedToolState from './useViewEncryptedToolState';

const ViewEncryptedTool = ({ style }) => {
    const { usedContextValue } = useViewEncryptedToolState();

    return (
        <>
            <button onClick={usedContextValue.onClickViewEncrypted} className={style}>
                {usedContextValue.viewEncrypted === ViewEncrypted.NO ? 'Show Encrypted' : 'Hide Encrypted'}
            </button>
        </>
    );
};

export default ViewEncryptedTool;