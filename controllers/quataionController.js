const Quotation=require('../model/quotationModel')

exports.createQuotation = async (req, res) => {
    try {
      const { leadId, items } = req.body;
      if (!leadId || !items || items.length === 0) {
        return res.status(400).json({ message: "Opportunity and items are required" });
      }
  
      const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      
      const quotation = new Quotation({
        leadId,
        items,
        totalValue,
        quoteNumber: `QUOTE-${Date.now()}`,
      });
  
      const savedQuotation = await quotation.save();
      res.status(201).json(savedQuotation);
    } catch (error) {
      res.status(500).json({ message: "Error creating quotation", error: error.message });
    }
  };
  

  exports.updateQuotation = async (req, res) => {
    try {
      const { id } = req.params;
      const { leadId, items } = req.body;
  
      if (!id || !leadId || !items || items.length === 0) {
        return res.status(400).json({ message: "Quotation ID, opportunity, and items are required" });
      }
  
      const quotation = await Quotation.findById(id);
      if (!quotation) {
        return res.status(404).json({ message: "Quotation not found" });
      }
  
      quotation.leadId = leadId;
      quotation.items = items;
  
      const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      quotation.totalValue = totalValue;
  
      const updatedQuotation = await quotation.save();
      res.status(200).json(updatedQuotation);
    } catch (error) {
      res.status(500).json({ message: "Error updating quotation", error: error.message });
    }
  };


  exports.getQuotation = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Quotation ID is required" });
      }
  
      const quotation = await Quotation.findById(id).populate("leadId");
      if (!quotation) {
        return res.status(404).json({ message: "Quotation not found" });
      }
  
      res.status(200).json(quotation);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quotation", error: error.message });
    }
  };