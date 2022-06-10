const AVRRespository = module.exports;

const axios = require('axios');
const { AVR_API_KEY } = require('../configs/app');

AVRRespository.searchByCoordinates = async (lat, lon, radius) => {
  const options = {
    method: 'GET',
    url: 'https://aviation-reference-data.p.rapidapi.com/airports/search',
    params: { lat, lon, radius },
    headers: {
      'X-RapidAPI-Key': AVR_API_KEY,
      'X-RapidAPI-Host': 'aviation-reference-data.p.rapidapi.com',
    },
  };

  return axios.request(options).then((response) => response.data).catch((error) => error);
};
