const router = require('express').Router();

router.get('/', async (_req, res) => {
  try {
    res.send();
  } catch (e) {
    res.status(503).send();
  }
});

module.exports = router;
