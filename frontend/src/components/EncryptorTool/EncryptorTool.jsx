import styles from './EncryptorTool.module.css';
import React from 'react';
import { FaLock } from 'react-icons/fa6';
import useEncryptorToolState from './useEncryptorToolState';

const EncryptorTool = () => {
    const { usedContextValue } = useEncryptorToolState();

    return (
        <button onClick={usedContextValue.onStartEncryptor} className={styles.button}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FaLock size={30}/>
                </div>
                <div className={styles.description}>
                    <h4>Encryptor</h4>
                    <p>
                        Select one or more images to encrypt or decrypt.
                        Toggle their visibility to see them.
                        You need to set up gpg first.
                        <br/>
                        <b>LOSS OF GPG CREDENTIALS MEANS LOSS OF ENCRYPTED IMAGES!</b>
                    </p>
                </div>
            </div>
        </button>
    );
};

export default EncryptorTool;