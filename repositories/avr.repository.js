const AVRRespository = module.exports;

const axios = require('axios');

AVRRespository.searchByCoordinates = async (lat, lon, radius) => {
  const options = {
    method: 'GET',
    url: 'https://aviation-reference-data.p.rapidapi.com/airports/search',
    params: { lat, lon, radius },
    headers: {
      'X-RapidAPI-Key': '259b4e7ca4msh8aa30d4c92c31f1p19ac03jsnbe37f40fa497',
      'X-RapidAPI-Host': 'aviation-reference-data.p.rapidapi.com',
    },
  };

  return axios.request(options).then((response) => response.data).catch((error) => error);
};
