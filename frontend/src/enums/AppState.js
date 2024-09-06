const AppState = {
    START: 'Start',
    BROWSING: 'Browsing',
    PREVIEW: 'Preview',
    BATCH_TAG_EDITOR: 'Batch_Tag_Editor',
    SETTINGS: 'Settings',
    ENCRYPTOR: 'Encryptor',

    isMultiselect: (v) => [ AppState.BATCH_TAG_EDITOR, AppState.ENCRYPTOR ].includes(v)
};

export default AppState;
