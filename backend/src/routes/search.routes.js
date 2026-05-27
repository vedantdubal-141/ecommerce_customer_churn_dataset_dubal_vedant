const express = require('express');
const router = express.Router();
const customerService = require('../services/customer.service');

router.get('/customers', async (req, res, next) => {
  try {
    const data = await customerService.search(req.query.q);
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

module.exports = router;
