import axios from 'axios';
import networkService from './networkService';

const BASE_URL = networkService.getURLToBackend('/api/v1');

const getAllImages = async () => {
    const { data } = await axios.get(`${BASE_URL}/original/info`);
    
    return data;
};

const getAllImagesStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/original/info/count`);

    return data;
};

const getImages = async (query, page) => {
    const { data } = await axios.get(`${BASE_URL}/original/info?page=${page}&tags=${query}`);

    return data;
};

const getImagesStats = async (query) => {
    const { data } = await axios.get(`${BASE_URL}/original/info/count?tags=${query}`);

    return data;
};

const modifyImage = async (id, modifications) => {
    const { data } = await axios.put(`${BASE_URL}/original/info/${id}`, modifications)

    return data;
};

const getFavouriteImages = async (page) => {
    const { data } = await axios.get(`${BASE_URL}/original/info/favourites?page=${page}`)

    return data;
};

const getFavouriteImagesStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/original/info/favourites/count`)

    return data;
};

const getTags = async () => {
    const { data } = await axios.get(`${BASE_URL}/original/tag`)

    return data;
};

const requestService = {
    getAllImages,
    getAllImagesStats,
    getImages,
    getImagesStats, 
    modifyImage,
    getFavouriteImages,
    getFavouriteImagesStats,
    getTags
};
export default requestService;
