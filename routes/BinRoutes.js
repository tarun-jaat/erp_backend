const express = require('express');
const binController = require('../controllers/BinController');

const router = express.Router();

router.post('/bins', binController.createBin);
router.get('/bins', binController.getAllBins);
router.get('/bins/:id', binController.getBinById);
router.put('/bins/:id', binController.updateBin);
router.delete('/bins/:id', binController.deleteBin);

module.exports = router;
