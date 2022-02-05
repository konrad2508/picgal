import axios from 'axios';
import networkService from './networkService';

const BASE_URL = networkService.getURLToBackend('/api/v1');

const getAllImages = async () => {
    const { data } = await axios.get(`${BASE_URL}/info`);
    
    return data;
};

const getAllImagesStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/info/count`);

    return data;
};

const getImages = async (query, page) => {
    const { data } = await axios.get(`${BASE_URL}/info?page=${page}&tags=${query}`);

    return data;
};

const getImagesStats = async (query) => {
    const { data } = await axios.get(`${BASE_URL}/info/count?tags=${query}`);

    return data;
};

const modifyImage = async (id, modifications) => {
    const { data } = await axios.put(`${BASE_URL}/info/${id}`, modifications)

    return data;
};

const getTags = async () => {
    const { data } = await axios.get(`${BASE_URL}/tag`)

    return data;
};

const requestService = {
    getAllImages,
    getAllImagesStats,
    getImages,
    getImagesStats, 
    modifyImage,
    getTags
};
export default requestService;
