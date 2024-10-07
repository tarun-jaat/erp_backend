const mongoose = require("mongoose");

const lineItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const purchaseOrderSchema = new mongoose.Schema({
  vendor: {
    type: String,
    // ref: "User", // Uncomment this if you want to reference a User model
    required: true, // Uncomment this if the vendor is required
  },
  orderDate: { type: Date, required: true },
  items: [lineItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["draft", "submitted", "paid", "cancelled"],
    default: "draft",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  paymentDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  salesOrderNumber: { type: String },
  referenceNumber: { type: Number },
  customerName: { type: String },
  invoiced: { type: Boolean, default: false },
  payment: { type: String },
});

// Pre-save middleware to generate sales order number and reference number
purchaseOrderSchema.pre("save", async function(next) {
  if (this.isNew) {
    const { salesOrderNumber, referenceNumber } = await this.constructor.generateOrderNumbers();
    this.salesOrderNumber = salesOrderNumber;
    this.referenceNumber = referenceNumber;
  }
  next();
});

// Static method to generate order numbers
purchaseOrderSchema.statics.generateOrderNumbers = async function() {
  const lastOrder = await this.findOne().sort({ createdAt: -1 });
  let salesOrderNumber, referenceNumber;

  if (!lastOrder) {
    salesOrderNumber = "SO-01";
    referenceNumber = 1;
  } else {
    const lastSalesOrderNumber = lastOrder.salesOrderNumber;
    const lastReferenceNumber = lastOrder.referenceNumber;
    const nextReferenceNumber = lastReferenceNumber + 1;
    salesOrderNumber = `SO-${nextReferenceNumber.toString().padStart(2, "0")}`;
    referenceNumber = nextReferenceNumber;
  }

  return { salesOrderNumber, referenceNumber };
};

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
