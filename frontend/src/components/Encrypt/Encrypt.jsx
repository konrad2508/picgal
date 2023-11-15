import styles from './Encrypt.module.css';
import React from 'react';
import useEncryptState from './useEncryptState';

const Encrypt = () => {
    const { usedContextValue } = useEncryptState();

    return (
        <>
            <button onClick={usedContextValue.onClickEncrypt} className={styles.button}>Toggle Encryption</button>
        </>
    );
};

export default Encrypt;
