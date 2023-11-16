const modificationForm = () => {
    const form = {
        charactersAdded: [],
        charactersRemoved: [],
        sourcesAdded: [],
        sourcesRemoved: [],
        generalAdded: [],
        generalRemoved: [],
        metaAdded: [],
        metaRemoved: [],
        toggleFavourite: false
    };

    const formComplements = {
        charactersAdded: 'charactersRemoved',
        charactersRemoved: 'charactersAdded',
        sourcesAdded: 'sourcesRemoved',
        sourcesRemoved: 'sourcesAdded',
        generalAdded: 'generalRemoved',
        generalRemoved: 'generalAdded',
        metaAdded: 'metaRemoved',
        metaRemoved: 'metaAdded'
    };

    return { form, formComplements };
};

export default modificationForm;
