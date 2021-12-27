import React from 'react';
import AutocompleteCommand from '../enums/AutocompleteCommand';

const useAutocompleteState = () => {
    const [ display, setDisplay ] = React.useState(false);
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
            case AutocompleteCommand.ENABLE: {
                setDisplay(true);

                break;
            }

            case AutocompleteCommand.DISABLE: {
                setDisplay(false);

                break;
            }

            default: {}
        }
    };

    return {
        state: { display, wrapperRef },
        switchAutocompleteState
    };
};

export default useAutocompleteState;
