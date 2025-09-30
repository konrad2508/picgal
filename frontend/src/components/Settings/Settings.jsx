import styles from './Settings.module.css';
import React from 'react';
import useSettingsState from './useSettingsState';

const Settings = () => {
    const { usedContextValue } = useSettingsState();

    const renderOption = (k, i) => {
        const inputField = () => {
            if (/^[0-9]+$/.test(usedContextValue.config[k])) {
                const validator = (e) => {
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                };

                return (
                    <input
                        id={k}
                        type="number"
                        onKeyPress={validator}
                        defaultValue={usedContextValue.config[k]} className={styles.optionValue}
                    />
                );
            }
            else {
                return (
                    <input id={k} type="text" defaultValue={usedContextValue.config[k]} className={styles.optionValue}/>
                );
            }
        };

        return (
            <div key={i} className={styles.optionContainer}>
                <p className={styles.optionTitle}>{k}</p>
                { inputField() }
            </div>
        );
    };

    const onPressSave = () => {
        const modifications = Object.fromEntries(
            Object.keys(usedContextValue.config).map((k, _) => [k, document.getElementById(k).value])
        );

        usedContextValue.onSaveSettings(modifications);
    };

    return (
        <div className={styles.center}>
            <div className={styles.box}>
                <div className={styles.center}>
                    <h3>Settings</h3>
                </div>
                <hr/>
                <div className={styles.options}>
                    {Object.keys(usedContextValue.config).map((k, i) => renderOption(k, i))}
                </div>
                <hr/>
                <div className={styles.center}>
                    <button onClick={onPressSave} className={styles.button}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
