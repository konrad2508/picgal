import React from 'react';
import AutocompleteCommand from '../enums/AutocompleteCommand';

const useAutocompleteState = () => {
    const [ display, setDisplay ] = React.useState(false);
    const [ virtualTagMode, setVirtualTagMode ] = React.useState(false);
    const [ subtagList, setSubtagList ] = React.useState([]);
    const wrapperRef = React.useRef(null);

    const handleClickOutside = (event) => {
        const { current } = wrapperRef;

        if (current && !current.contains(event.target)) {
            setDisplay(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const switchAutocompleteState = (command, args) => {
        switch (command) {
            case AutocompleteCommand.ENABLE_DISPLAY: {
                setDisplay(true);

                break;
            }

            case AutocompleteCommand.DISABLE_DISPLAY: {
                setDisplay(false);

                break;
            }

            case AutocompleteCommand.ENABLE_VIRTUAL_TAG_MODE: {
                const { subtags } = args;

                setSubtagList(subtags);
                setVirtualTagMode(true);

                break;
            }

            case AutocompleteCommand.DISABLE_VIRTUAL_TAG_MODE: {
                setSubtagList([]);
                setVirtualTagMode(false);

                break;
            }

            default: {}
        }
    };

    return {
        autocompleteState: { display, wrapperRef, virtualTagMode, subtagList },
        switchAutocompleteState
    };
};

export default useAutocompleteState;
