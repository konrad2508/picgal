import styles from './ViewEncryptedTool.module.css';
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import ViewEncrypted from '../../enums/ViewEncrypted';
import useViewEncryptedToolState from './useViewEncryptedToolState';

const ViewEncryptedTool = () => {
    const { usedContextValue } = useViewEncryptedToolState();

    return (
        <button onClick={usedContextValue.onStartEncryptor} className={styles.button}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    {usedContextValue.viewEncrypted === ViewEncrypted.NO ? <FaEye size={30}/> : <FaEyeSlash size={30}/>}
                </div>
                <div className={styles.description}>
                    <h4>Toggle Encrypted Images Visibility</h4>
                    <p>
                        Click here to toggle visibility of encrypted images. You will be asked to authorize to view them.
                        <br/>
                        Current mode: <b>{usedContextValue.viewEncrypted === ViewEncrypted.NO ? 'hide' : 'view'}</b>
                    </p>
                </div>
            </div>
        </button>
    );
};

export default ViewEncryptedTool;