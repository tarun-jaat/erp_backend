const express = require('express');
const itemController = require('../controllers/ItemContoller');
const Item =require('../model/itemsmodel')
const router = express.Router();

router.post('/items', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);
router.post("/import", async (req, res) => {
    try {
      const items = req.body;
      await Item.insertMany(items); // Insert the items into the database
      res.status(200).json({ message: "Items imported successfully" });
    } catch (error) {
      console.error("Error importing items:", error);
      res.status(500).json({ error: "Failed to import items" });
    }
  });

module.exports = router;
