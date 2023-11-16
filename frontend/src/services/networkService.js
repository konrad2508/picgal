const getURLToBackend = (suffix) => {
    const baseURL = 'http://localhost:3001';
    
    if (suffix) {
        return `${baseURL}${suffix}`;
    }

    return baseURL;
};

const networkService = {
    getURLToBackend
};

export default networkService;
