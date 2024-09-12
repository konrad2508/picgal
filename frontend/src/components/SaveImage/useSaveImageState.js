import React from 'react';
import AppContext from '../../context/AppContext';

const useSaveImageState = (id) => {
    const { config, onClickSaveImage } = React.useContext(AppContext);

    const [ filename, setFileName ] = React.useState('');

    const onFileNameChange = (e) => setFileName(e.target.value);

    const onSaveImage = () => {
        onClickSaveImage(id, config.saveDir, filename);
        setFileName('');
    };

    const contextValue = {
        filename,
        onFileNameChange,
        onSaveImage
    };

    const usedContextValue = {
        config
    };

    return {
        contextValue,
        usedContextValue
    };
};

export default useSaveImageState;
