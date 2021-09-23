const router = require('express').Router();
const Bin = require('../models/bins');


// create bin: POST /
router.post('/', async (req, res) => {
  const bin = new Bin();
  await bin.save();
  res.json(bin);
});

// fetch requests of a bin: GET /:binId
router.get('/:binId', async (req, res) => {
  const bin = await Bin.findById(req.params.binId);
  if (bin) {
    res.json(bin.requests);
  } else {
    res.status(404);
    res.json({message: `Bin with id ${req.params.binId} doesn't exists. Create one first.`});
  }
});

module.exports = {api: router};