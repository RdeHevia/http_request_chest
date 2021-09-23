const router = require('express').Router();

const { Request } = require('../models/requests');
const Bin = require('../models/bins');

const parseRequest = (req) => {
  const ip = req.headers["x-forwarded-for"];
  return new Request({
    protocol: req.protocol,
    method: req.method,
    hostname: req.hostname,
    path: req.path,
    ip,
    headers: req.headers,
    body: req.body,
  });
};

router.all('/:binId', async (req, res) => {
  const bin = await Bin.findById(req.params.binId);

  if (bin) {
    const request = parseRequest(req);
    bin.requests.push(request);
    await bin.save();
    res.json({message: `http-request successfully stored in Bin ${req.params.binId}`});
  } else {
    res.status(404);
    res.json({message: `Bin with id ${req.params.binId} doesn't exists. Create one first`});
  }
});

module.exports = router;