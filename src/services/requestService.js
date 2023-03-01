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

const getImages = async (query, page) => {
    const { data } = await axios.get(`${BASE_URL}/info?page=${page}&tags=${query}`);

    return camelize(data);
};

const getImagesStats = async (query) => {
    const { data } = await axios.get(`${BASE_URL}/info/count?tags=${query}`);

    return camelize(data);
};

const modifyImage = async (id, modifications) => {
    const { data } = await axios.put(`${BASE_URL}/info/${id}`, snakeize(modifications));

    return camelize(data);
};

const getTags = async () => {
    const { data } = await axios.get(`${BASE_URL}/tag`);

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
    const { data } = await axios.post(`${BASE_URL}/rpc/syncdatabase`);

    return camelize(data);
};

const modifyImageBatch = async (batchModifications) => {
    const { data } = await axios.put(`${BASE_URL}/info`, snakeize(batchModifications));

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
    modifyImageBatch
};
export default requestService;
