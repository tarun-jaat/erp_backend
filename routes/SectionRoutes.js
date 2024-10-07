const express = require('express');
const sectionController = require('../controllers/SectionController');

const router = express.Router();

router.post('/sections', sectionController.createSection);
router.get('/sections', sectionController.getAllSections);
router.get('/sections/:id', sectionController.getSectionById);
router.put('/sections/:id', sectionController.updateSection);
router.delete('/sections/:id', sectionController.deleteSection);

module.exports = router;
