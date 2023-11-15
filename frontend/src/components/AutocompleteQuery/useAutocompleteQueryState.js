import React from 'react';
import autocompleteStateService from '../../services/autocompleteStateService';

const useAutocompleteQueryState = () => {
    const [ display, setDisplay ] = React.useState(false);
    const [ virtualTagMode, setVirtualTagMode ] = React.useState(false);
    const [ subtagList, setSubtagList ] = React.useState([]);
    const wrapperRef = React.useRef(null);

    const hookService = autocompleteStateService({ setDisplay, setVirtualTagMode, setSubtagList }, wrapperRef);

    React.useEffect(hookService.bindMouseClick, []);

    const enableDisplay = () => hookService.enableDisplayCommand();
    const disableDisplay = () => hookService.disableDisplayCommand();
    const enableVirtualTagMode = (subtags) => hookService.enableVirtualTagMode(subtags);
    const disableVirtualTagMode = () => hookService.disableVirtualTagMode();

    const contextValue = {
        display,
        virtualTagMode,
        subtagList,
        wrapperRef,
        enableDisplay,
        disableDisplay,
        enableVirtualTagMode,
        disableVirtualTagMode
    };

    return {
        contextValue
    };
};

export default useAutocompleteQueryState;
