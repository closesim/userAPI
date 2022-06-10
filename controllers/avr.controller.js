const AVRController = module.exports;
const AVRRepository = require('../repositories/avr.repository');

AVRController.search = async (req, res) => {
  const { lat = 0, lon = 0, radius = '100' } = req.body;

  if (!lat || !lon || !radius
    || Number.isNaN(lat) || Number.isNaN(lon) || Number.isNaN(radius)) {
    return res.status(400).send('Invalid Coordinates');
  }

  return AVRRepository.searchByCoordinates(lat, lon, radius)
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(500).send(error));
};
