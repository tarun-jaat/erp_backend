const Bin = require('../model/binModel');
const WarehouseModel=require('../model/WarehouseModel');
// Create Bin// Create Bin
exports.createBin = async (req, res) => {
  try {
    const bin = new Bin(req.body);

    await bin.save();
    
    const warehouseId = req.body.warehouse;
    console.log(warehouseId)
    const warehouse = await WarehouseModel.findById(warehouseId);
    console.log('bin',bin)
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    warehouse.bins.push(bin._id);
    await warehouse.save();

    // Return the newly created bin
    res.status(201).json(bin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Bins
exports.getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find().populate('sections');
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Bin by ID
exports.getBinById = async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id).populate('sections');
    if (!bin) return res.status(404).json({ error: 'Bin not found' });
    res.status(200).json(bin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Bin
exports.updateBin = async (req, res) => {
  try {
    const bin = await Bin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(bin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Bin
exports.deleteBin = async (req, res) => {
  try {
    await Bin.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
