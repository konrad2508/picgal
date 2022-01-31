const inputQueryToUrlQuery = (inputQuery) => {
    return inputQuery.trim().toLowerCase().replaceAll(' ', '+');
};

const inputTagToNormalTag = (inputTag) => {
    return inputTag.trim().toLowerCase().replaceAll('_', ' ');
};

const normalTagToInputTag = (normalTag) => {
    return normalTag.trim().toLowerCase().replaceAll(' ', '_');
};

const normalVirtualTagToInputVirtualTag = (normalVirtualTag) => {
    return `${normalVirtualTag.trim().toLowerCase().replaceAll(' ', '_')}:`
};

const findPotentialVirtualTag = (input, existingTags) => {
    const potentialVirtualTagName = input.split(':')[0];
    const potentialVirtualTag = existingTags.find(e => e.tagType === 'virtual' && e.name === potentialVirtualTagName);

    return potentialVirtualTag;
};

const queryService = {
    inputQueryToUrlQuery,
    inputTagToNormalTag,
    normalTagToInputTag,
    normalVirtualTagToInputVirtualTag,
    findPotentialVirtualTag
};

export default queryService;
