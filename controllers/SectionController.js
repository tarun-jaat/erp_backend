const Section = require("../model/SectionModel");
const BinModel = require("../model/binModel");

// Create Section
exports.createSection = async (req, res) => {
  try {
    const binId = req.body.bin;
    // Create new section from request body
    const section = new Section(req.body);

    // Find the bin by binId
    const bin = await BinModel.findById(binId);
    if (!bin) {
      return res.status(404).json({ error: "Bin not found" });
    }

    // Push section._id into the bin's sections array
    bin.sections.push(section._id);

    // Save the section and then update the bin
    await section.save();
    await bin.save();

    // Send a success response
    res.status(201).json(section);
  } catch (error) {
    // Send error response in case of failure
    res.status(500).json({ error: error.message });
  }
};

// Get all Sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find().populate("items");
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Section by ID
exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).populate("items");
    if (!section) return res.status(404).json({ error: "Section not found" });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Section
exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Section
exports.deleteSection = async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
