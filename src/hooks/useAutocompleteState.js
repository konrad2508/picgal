import React from 'react';
import AutocompleteCommand from '../enums/AutocompleteCommand';
import autocompleteStateService from '../services/autocompleteStateService';

const useAutocompleteState = () => {
    const [ display, setDisplay ] = React.useState(false);
    const [ virtualTagMode, setVirtualTagMode ] = React.useState(false);
    const [ subtagList, setSubtagList ] = React.useState([]);
    const wrapperRef = React.useRef(null);

    const hookService = autocompleteStateService({ setDisplay, setVirtualTagMode, setSubtagList }, wrapperRef);

    React.useEffect(hookService.bindMouseClick, []);

    const switchAutocompleteState = (command, args) => {
        switch (command) {
            case AutocompleteCommand.ENABLE_DISPLAY: {
                hookService.enableDisplayCommand();

                break;
            }

            case AutocompleteCommand.DISABLE_DISPLAY: {
                hookService.disableDisplayCommand();

                break;
            }

            case AutocompleteCommand.ENABLE_VIRTUAL_TAG_MODE: {
                const { subtags } = args;

                hookService.enableVirtualTagMode(subtags);

                break;
            }

            case AutocompleteCommand.DISABLE_VIRTUAL_TAG_MODE: {
                hookService.disableVirtualTagMode();

                break;
            }

            default: { }
        }
    };

    return {
        autocompleteState: { display, wrapperRef, virtualTagMode, subtagList },
        switchAutocompleteState
    };
};

export default useAutocompleteState;
