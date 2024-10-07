const express = require('express');
const warehouseController = require('../controllers/Warehouse');
const aggregateController = require('../controllers/AggreateController');

const router = express.Router();

router.post('/warehouses', warehouseController.createWarehouse);
router.get('/warehouses', warehouseController.getAllWarehouses);
router.get('/warehouses/:id', warehouseController.getWarehouseById);
router.put('/warehouses/:id', warehouseController.updateWarehouse);
router.delete('/warehouses/:id', warehouseController.deleteWarehouse);

// Get full warehouse hierarchy
router.get('/warehouses/:id/hierarchy', aggregateController.getWarehouseHierarchy);

module.exports = router;
