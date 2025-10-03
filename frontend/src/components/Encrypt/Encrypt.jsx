import styles from './Encrypt.module.css';
import React from 'react';
import { FaEyeLowVision } from 'react-icons/fa6';
import useEncryptState from './useEncryptState';

const Encrypt = () => {
    const { usedContextValue } = useEncryptState();

    return (
        <div className={styles.container}>
            <h3>Toggle encryption</h3>
            <button
                onClick={usedContextValue.onClickEncrypt}
                className={styles.button}
            >
                <FaEyeLowVision/>
            </button>
        </div>
    );
};

export default Encrypt;
