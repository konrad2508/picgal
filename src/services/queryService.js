const inputQueryToUrlQuery = (inputQuery) => {
    return inputQuery.trim().replaceAll(' ', '+');
};

const inputTagToNormalTag = (inputTag) => {
    return inputTag.trim().replaceAll('_', ' ');
};

const normalTagToInputTag = (normalTag) => {
    return normalTag.trim().replaceAll(' ', '_');
};

const queryService = {
    inputQueryToUrlQuery,
    inputTagToNormalTag,
    normalTagToInputTag
};

export default queryService;
