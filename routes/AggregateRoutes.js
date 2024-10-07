const express = require('express');
const {
  aggregateStockByWarehouse,
  aggregateStockByItem,
  aggregateStockByBin,
} = require('../controllers/AggreateController');
const router = express.Router();

router.get('/by-warehouse', aggregateStockByWarehouse);
router.get('/by-item', aggregateStockByItem);
router.get('/by-bin', aggregateStockByBin);

module.exports = router;
