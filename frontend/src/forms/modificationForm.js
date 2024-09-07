const modificationForm = () => {
    const form = {
        lowlevelAdded: [],
        lowlevelRemoved: [],
        highlevelAdded: [],
        highlevelRemoved: [],
        generalAdded: [],
        generalRemoved: [],
        metaAdded: [],
        metaRemoved: [],
        toggleFavourite: false
    };

    const formComplements = {
        lowlevelAdded: 'lowlevelRemoved',
        lowlevelRemoved: 'lowlevelAdded',
        highlevelAdded: 'highlevelRemoved',
        highlevelRemoved: 'highlevelAdded',
        generalAdded: 'generalRemoved',
        generalRemoved: 'generalAdded',
        metaAdded: 'metaRemoved',
        metaRemoved: 'metaAdded'
    };

    return { form, formComplements };
};

export default modificationForm;
