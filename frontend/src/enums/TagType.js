const TagType = {
    LOWLEVEL: {
        name: 'Lowlevel',
        overridedBy: 'lowLevelName',
        value: 1,
        color: '#39ed21'
    },
    HIGHLEVEL: { 
        name: 'Highlevel',
        overridedBy: 'highLevelName',
        value: 2,
        color: '#7921ed'
    },
    GENERAL: {
        name: 'General',
        overridedBy: null,
        value: 3,
        color: '#ed9121'
    },
    META: {
        name: 'Meta',
        overridedBy: null,
        value: 4,
        color: '#e0101e'
    },
    VIRTUAL: {
        name: 'Virtual',
        overridedBy: null,
        value: 5,
        color: '#11baa9'
    }
};

export default TagType;
