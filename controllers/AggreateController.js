const Warehouse = require('../model/WarehouseModel');
const Bin = require('../model/binModel');
const Section = require('../model/SectionModel');
const Item = require('../model/itemsmodel');

exports.getWarehouseHierarchy = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id)
      .populate({
        path: 'bins',
        populate: {
          path: 'sections',
          populate: {
            path: 'items',
            model: 'Item'
          }
        }
      });
    
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.groupItemsBySKU = async (req, res) => {
  try {
      // Aggregation pipeline to group items by SKU
      const aggregatedItems = await Item.aggregate([
          {
              $group: {
                  _id: "$SKU", // Group by SKU
                  totalItems: { $sum: 1 }, // Count total items for each SKU
                  items: { $push: "$$ROOT" }, // Push all item details into an array
              },
          },
          {
              $project: {
                  _id: 0, // Exclude the default _id
                  SKU: "$_id", // Rename _id to SKU
                  totalItems: 1,
                  items: 1,
              },
          },
      ]);

      res.status(200).json(aggregatedItems);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
