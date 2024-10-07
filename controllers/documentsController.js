const Document = require("../model/Document");

exports.UploadDocument = async (req, res) => {
  const { title, description, employee } = req.body;
  const filePath = req.file.path;
  try {
    const document = new Document({
      title,
      description,
      employee,
      filePath,
    });
    await document.save();
    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error uploading document",
    });
  }
};

exports.getDocumentsByEmployee = async (req, res) => {
  try {
    const documents = await Document.find({ employee: req.params.id });
    res.status(200).json({
      success: true,
      documents,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving documents",
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting document",
    });
  }
};
