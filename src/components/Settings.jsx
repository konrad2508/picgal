import styles from '../styles/Settings.module.css';
import React from 'react';
import AppContext from './context/AppContext';

const Settings = () => {
    const { config, onSaveSettings } = React.useContext(AppContext)

    const renderOption = (k, i) => {
        const inputField = () => {
            if (/^[0-9]*$/.test(config[k])) {
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
                        defaultValue={config[k]} className={styles.optionValue}/>
                );
            }
            else {
                return (
                    <input id={k} type="text" defaultValue={config[k]} className={styles.optionValue}/>
                );
            }
        };

        return (
            <div key={i} className={styles.optionContainer}>
                <h4 className={styles.optionTitle}>{k}</h4>
                { inputField() }
            </div>
        );
    };

    const onPressSave = () => {
        const modifications = Object.fromEntries(
            Object.keys(config).map((k, _) => [k, document.getElementById(k).value])
        );

        onSaveSettings(modifications);
    };

    return (
        <div className={styles.container}>
            <h3>Settings</h3>
            <div className={styles.options}>
                {Object.keys(config).map((k, i) => renderOption(k, i))}
            </div>
            <button onClick={onPressSave} className={styles.button}>Save</button>
        </div>
    );
};

export default Settings;
