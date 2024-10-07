const Item = require('../model/itemsmodel');
const Warehouse =require('../model/WarehouseModel')
const Section = require('../model/SectionModel');
const Bin = require('../model/binModel');


exports.createItem = async (req, res) => {
  try {
    const {  stocksLevel, sectionId, itemName, itemSKU, itemCategory } = req.body;

    // Check if an item with the same SKU already exists
    const existingItem = await Item.findOne({ sku: itemSKU });
    if (existingItem) {
      return res.status(400).json({ error: 'Item with this SKU already exists' });
    }

    // Create a new item
    const newItem = new Item({
      name: itemName,
      sku: itemSKU,
      category: itemCategory,
      location: sectionId,
      stock: stocksLevel
    });

    // Save the new item to the database
    const savedItem = await newItem.save();



    // Find the section within the bin
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Section not found in the bin' });
    }

    // Check if the section has space (based on the section limit)
    // if (section.items.length >= section.capacity) {
    //   return res.status(400).json({ error: 'Section is full, cannot add more items' });
    // }

    // Add the item to the section
    section.items.push(savedItem._id);
    

    res.status(201).json({
      message: 'Item successfully added to the section',
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({ error: 'Duplicate SKU, item already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('location');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('location');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
