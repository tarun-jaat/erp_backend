const PurchaseOrder = require('../model/purchaseOrderSchema');

exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrder(req.body);
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate();
    res.json(purchaseOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(purchaseOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Purchase Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
