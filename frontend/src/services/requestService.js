import axios from 'axios';
import camelize from 'camelize';
import snakeize from 'snakeize';
import networkService from './networkService';

const BASE_URL = networkService.getURLToBackend('/api/v1');

const getAllImages = async () => {
    const { data } = await axios.get(`${BASE_URL}/info`);
    
    return camelize(data);
};

const getAllImagesStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/info/count`);

    return camelize(data);
};

const getImages = async (query, page, viewEncrypted) => {
    const { data } = await axios.get(`${BASE_URL}/info?page=${page}&tags=${query}&viewEncrypted=${viewEncrypted}`);

    return camelize(data);
};

const getImagesStats = async (query, viewEncrypted) => {
    const { data } = await axios.get(`${BASE_URL}/info/count?tags=${query}&viewEncrypted=${viewEncrypted}`);

    return camelize(data);
};

const modifyImage = async (id, modifications) => {
    const { data } = await axios.put(`${BASE_URL}/info/${id}`, snakeize(modifications));

    return camelize(data);
};

const getTags = async (viewEncrypted) => {
    const { data } = await axios.get(`${BASE_URL}/tag?viewEncrypted=${viewEncrypted}`);

    return camelize(data);
};

const getSavedQueries = async () => {
    const { data } = await axios.get(`${BASE_URL}/query`);

    return camelize(data);
};

const modifySavedQuery = async (id, modifications) => {
    const { data } = await axios.put(`${BASE_URL}/query/${id}`, snakeize(modifications));

    return camelize(data);
};

const deleteSavedQuery = async (id) => {
    const { data } = await axios.delete(`${BASE_URL}/query/${id}`);

    return camelize(data);
};

const createSavedQuery = async (newSavedQuery) => {
    const { data } = await axios.post(`${BASE_URL}/query`, snakeize(newSavedQuery));
    
    return camelize(data);
};

const syncDatabase = async () => {
    const { data } = await axios.post(`${BASE_URL}/rpc/sync`);

    return camelize(data);
};

const getConfig = async () => {
    const { data } = await axios.get(`${BASE_URL}/rpc/config`);

    return camelize(data);
};

const modifyConfig = async (modifications) => {
    const { data } = await axios.put(`${BASE_URL}/rpc/config`, snakeize(modifications));

    return camelize(data);
};

const modifyImageBatch = async (batchModifications) => {
    const { data } = await axios.put(`${BASE_URL}/info`, snakeize(batchModifications));

    return camelize(data);
};

const toggleEncryptImages = async (imagesToEncrypt) => {
    const { data } = await axios.post(`${BASE_URL}/image/toggle-encrypt`, snakeize(imagesToEncrypt));

    return camelize(data);
};

const saveImage = async (id, filename) => {
    const { data } = await axios.post(`${BASE_URL}/image/${id}/save`, snakeize(filename));

    return camelize(data);
};

const requestService = {
    getAllImages,
    getAllImagesStats,
    getImages,
    getImagesStats, 
    modifyImage,
    getTags,
    getSavedQueries,
    modifySavedQuery,
    deleteSavedQuery,
    createSavedQuery,
    syncDatabase,
    getConfig,
    modifyConfig,
    modifyImageBatch,
    toggleEncryptImages,
    saveImage
};
export default requestService;
