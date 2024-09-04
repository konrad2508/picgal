const TagType = {
    CHARACTERS: {
        name: 'Characters',
        overridedBy: 'lowLevelName',
        value: 1,
        color: '#39ed21'
    },
    SOURCES: { 
        name: 'Sources',
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
    }
};

export default TagType;
