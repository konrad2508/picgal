import styles from './SettingsTool.module.css';
import React from 'react';
import { FaWrench } from 'react-icons/fa6';
import useSettingsToolState from './useSettingsToolState';

const SettingsTool = () => {
    const { usedContextValue } = useSettingsToolState();

    return (
        <button onClick={usedContextValue.onStartSettings} className={styles.button}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FaWrench size={30}/>
                </div>
                <div className={styles.description}>
                    <h4>Settings</h4>
                    <p>
                        Change various properties of the app from here.
                        Alternatively you can edit them in the config.json file
                        in the app&apos;s root directory - some settings can only be changed from there.
                    </p>
                </div>
            </div>
        </button>
    );
};

export default SettingsTool;