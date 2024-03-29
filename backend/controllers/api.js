const router = require('express').Router();
const Bin = require('../models/bins');


// create bin: POST /
router.post('/', async (req, res) => {
  const bin = new Bin();
  bin.endPoint = `/${bin._id}`;
  await bin.save();
  res.json(bin);
});

// fetch requests only
router.get('/:binId/requests', async (req, res) => {

  const bin = await Bin.findById(req.params.binId);
  console.log('hi');
  if (bin) {
    res.json(bin.requests);
  } else {
    res.status(404);
    res.json({message: `Bin with id ${req.params.binId} doesn't exists. Create one first.`});
  }
});

// fetch bin (including all its requests): GET /:binId
router.get('/:binId', async (req, res) => {
  const bin = await Bin.findById(req.params.binId);

  let checkExists = req.query["check_exists"];

  if (checkExists) {
    res.json({exists: !!bin});
    return;
  }

  if (bin) {
    res.json(bin);
  } else {
    res.status(404);
    res.json({message: `Bin with id ${req.params.binId} doesn't exists. Create one first.`});
  }
});

module.exports = {api: router};