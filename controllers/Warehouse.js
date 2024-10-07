const { model } = require('mongoose');
const Warehouse = require('../model/WarehouseModel');

// Create Warehouse
exports.createWarehouse = async (req, res) => {
  try {
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Warehouses
// Get all Warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    // Find all warehouses and populate bins and sections with their items
    const warehouses = await Warehouse.find()
      .populate({
        path: 'bins',
        model: 'Bin',
        populate: {
          path: 'sections', 
          model:'Section',
          populate: {
            path: 'items', 
            model: 'Item', 
          },
        },
      });
      console.log(warehouses)

    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Warehouse by ID
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id).populate('bins');
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Warehouse
exports.updateWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Warehouse
exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
