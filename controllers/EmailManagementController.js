const EmailCampaign = require("../model/emailCampaign");
const Segment = require("../model/segmentation");
const mailSender = require("../utils/MailSender");

const Contact=require('../model/subscribeContacts')
exports.createCampaign = async (req, res) => {
  try {
    const { name, subject, body, segmentId } = req.body;
    if (!name || !subject || !body || !segmentId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const campaign = new EmailCampaign({
      name,
      subject,
      body,
      segmentId,
    });

    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating campaign", error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await EmailCampaign.find();
    res.json(campaigns);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting campaigns", error: error.message });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting campaign", error: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await EmailCampaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating campaign", error: error.message });
  }
};

exports.createSegment = async (req, res) => {
  try {
    const { name, criteria, contacts } = req.body;
    if (!name || !criteria) {
      return res
        .status(400)
        .json({ message: "Segment name and criteria are required" });
    }

    const segment = new Segment({
      name,
      criteria,
      contacts,
    });

    const savedSegment = await segment.save();
    res.status(201).json(savedSegment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating segment", error: error.message });
  }
};

exports.sendEmails = async (campaign, contacts) => {
  // Implement sending emails using a third-party email service or your preferred method
  contacts.forEach(async (contacts) => {
    // Send email to contact
    const personalizedBody = campaign.body.replace("{name}", contacts.name);
    await mailSender(contacts.email, campaign.subject, personalizedBody);
  });
};

exports.sendCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;
    const campaign = await EmailCampaign.findById(campaignId).populate(
      "segmentId"
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const segmentContacts = await Contact.find({
      _id: { $in: campaign.segmentId.contacts },
    });
    
    await sendEmails(campaign, segmentContacts);

    campaign.status = "Sent";
    campaign.sentAt = new Date();
    campaign.sentTo = segmentContacts.map((contact) => contact.email);
    await campaign.save();

    res.status(200).json({ message: "Campaign sent successfully", campaign });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending campaign", error: error.message });
  }
};
