const express = require('express');
const {
  createStock,
  getStocks,
  getStocksByWarehouse,
} = require('../controllers/StockController');
const router = express.Router();

router.post('/', createStock);
router.get('/', getStocks);
router.get('/warehouse/:warehouseId', getStocksByWarehouse);

module.exports = router;
