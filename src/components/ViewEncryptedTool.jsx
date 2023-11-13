import React from 'react';
import ViewEncrypted from '../enums/ViewEncrypted';
import useViewEncryptedState from '../hooks/useViewEncryptedState';

const ViewEncryptedTool = ({ style }) => {
    const { usedContextValue } = useViewEncryptedState();

    return (
        <>
            <button onClick={usedContextValue.onClickViewEncrypted} className={style}>
                {usedContextValue.viewEncrypted === ViewEncrypted.NO ? 'Show Encrypted' : 'Hide Encrypted'}
            </button>
        </>
    );
};

export default ViewEncryptedTool;