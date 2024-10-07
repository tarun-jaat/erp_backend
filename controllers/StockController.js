const Stock = require('../model/Stocksmodel');

// Create stock entry
exports.createStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get stock entries
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('item warehouse bin');
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stocks by warehouse
exports.getStocksByWarehouse = async (req, res) => {
  try {
    const stocks = await Stock.find({ warehouse: req.params.warehouseId }).populate('item bin');
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
