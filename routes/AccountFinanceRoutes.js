const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  approveExpense,
  rejectExpense,
} = require("../controllers/expenseController");

const {
  generateFinancialReport,
  getFinancialReports,
} = require("../controllers/FinanceController");

const {
  createPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/PurchaseOrderController");

const {
  createSalesRecord,
  getSalesRecords,
  updateSalesRecord,
  deleteSalesRecord,
  getSalesRecordsById,
} = require("../controllers/SalesController");

router.post("/expenses", createExpense);
router.get("/expenses", getExpenses);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);
router.post("/expenses/:id/approve", approveExpense);
router.post("/expenses/:id/reject", rejectExpense);

router.post("/financial-reports", generateFinancialReport);
router.get("/financial-reports", getFinancialReports);

router.post("/purchase-orders", createPurchaseOrder);
router.get("/purchase-orders", getPurchaseOrders);
router.put("/purchase-orders/:id", updatePurchaseOrder);
router.delete("/purchase-orders/:id", deletePurchaseOrder);

router.post("/sales", createSalesRecord);
router.get("/sales", getSalesRecords);
router.get("/sales/:id", getSalesRecordsById);
router.put("/sales/:id", updateSalesRecord);
router.delete("/sales/:id", deleteSalesRecord);

module.exports = router;
