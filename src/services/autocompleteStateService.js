const autocompleteStateService = ({ setDisplay, setVirtualTagMode, setSubtagList }, wrapperRef) => {
    const bindMouseClick = () => {
        const clickOutside = (event) => {
            const { current } = wrapperRef;
    
            if (current && !current.contains(event.target)) {
                setDisplay(false);
            }
        };

        window.addEventListener("mousedown", clickOutside);
        
        return () => {
            window.removeEventListener("mousedown", clickOutside);
        };
    };

    const enableDisplayCommand = () => {
        setDisplay(true);
    };

    const disableDisplayCommand = () => {
        setDisplay(false);
    };

    const enableVirtualTagMode = (subtags) => {
        setSubtagList(subtags);
        setVirtualTagMode(true);
    };

    const disableVirtualTagMode = () => {
        setSubtagList([]);
        setVirtualTagMode(false);
    };

    return {
        bindMouseClick,
        enableDisplayCommand,
        disableDisplayCommand,
        enableVirtualTagMode,
        disableVirtualTagMode
    };
};

export default autocompleteStateService;
