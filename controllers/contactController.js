// controllers/contactController.js
const Contact = require("../model/contact");
const Lead = require("../model/leads");
const mailSender = require("../utils/MailSender");
const TicketCounter = require("../model/TicketsModel");




const mongoose = require("mongoose");
const Sales = require("../model/salesSchema"); 

exports.createLead = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Start a transaction for the lead and sales creation

  try {
    const lead = new Lead(req.body);
    await lead.save({ session });

    const saleOrder = new Sales({
      user: req.body.user, 
      type: "sales_order", // Set type to sales_order
      lineItems: req.body.lineItems || [], // Assuming line items are sent in the request body
      totalAmount: req.body.value, // Assuming value is total amount
      purchaseOrderNumber: `PO-${Math.floor(Math.random() * 10000)}`, // Generate a PO number
      referenceNumber: req.body.referenceNumber || Math.floor(Math.random() * 1000000).toString(), // Generate a reference number if not provided
      vendorName: req.body.name, // Assuming name is in req.body
      amount: req.body.value, // Assuming value is in req.body
    });

    await saleOrder.save({ session });

    // Commit the transaction if both saves are successful
    await session.commitTransaction();
    res.status(201).json({ lead, saleOrder });
  } catch (error) {
    // Abort the transaction if there's an error
    await session.abortTransaction();
    res.status(500).json({ message: "Error creating lead and sale order", error });
  } finally {
    session.endSession(); // End the session
  }
};



// Create a new contact
exports.createContact = async (req, res) => {
  try {
    // Validate required fields
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ticketCounter = await TicketCounter.findOneAndUpdate(
      {},
      { $inc: { ticketNo: 1 } },
      { new: true, upsert: true }
    );

    // Create a new contact instance
    const contact = new Contact({
      name,
      email,
      phone,
      message,
      ticketNo: `TCK-${ticketCounter.ticketNo.toString().padStart(4, "0")}`,
    });

    const adminEmail = "badgujjar9991@gmail.com";
    const assignedTo = "66d854be18b0f07f5d3ebbb9";

    // Send email to admin
    const adminEmailResponse = await mailSender(
      adminEmail,
      "New Contact",
      `A new contact has been added with the following details:\n
      Name: ${contact.name}\n
      Email: ${contact.email}\n
      Phone: ${contact.phone}\n
      Message: ${contact.message}\n
      Assigned To: ${assignedTo}`
    );

    // Send email to the user
    const userEmailResponse = await mailSender(
      contact.email,
      "Contact Details",
      `Your contact details have been successfully submitted.\nThank you for reaching out to us.\nAdmin's response.`
    );

    // Save the contact to the database
    const savedContact = await contact.save();

    // Create a new lead
    const lead = new Lead({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      description: contact.message,
      status: "New",
      assignedTo,
      contactId: savedContact._id,
    });

    // Save the lead to the database
    await lead.save();

    // Respond with success
    res
      .status(201)
      .json({
        message: "Contact created and lead generated successfully",
        contact: savedContact,
      });
  } catch (error) {
    console.error("Error creating contact:", error);
    res
      .status(500)
      .json({ message: "Error creating contact", error: error.message });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    // const contacts = await Contact.find().populate('userId', 'name email');
    const contacts = await Contact.find()

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};


exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      // .populate('contactId')
      .populate('assignedTo', 'name email');
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};

// exports.createLead = async (req, res) => {
//   try {
//     const lead = new Lead(req.body);
//     await lead.save();
//     res.status(201).json(lead);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating lead", error });
//   }
// };

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error updating lead", error });
  }
};
