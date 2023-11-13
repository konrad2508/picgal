import styles from '../styles/Encrypt.module.css';
import React from 'react';
import useEncryptState from '../hooks/useEncryptState';

const Encrypt = () => {
    const { usedContextValue } = useEncryptState();

    return (
        <>
            <button onClick={usedContextValue.onClickEncrypt} className={styles.button}>Toggle Encryption</button>
        </>
    );
};

export default Encrypt;
