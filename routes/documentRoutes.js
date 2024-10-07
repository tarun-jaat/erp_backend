const express = require("express")

const router = express.Router()

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
})

const upload = multer({ storage: storage })

const {
    UploadDocument,
    getDocumentsByEmployee,
    deleteDocument
} = require("../controllers/documentsController")

// Upload Document
router.post("/upload", upload.single("document"), UploadDocument)

// Get Documents by Employee
router.get("/getDocumentsByEmployee", getDocumentsByEmployee)

// Delete Document
router.delete("/:id", deleteDocument)

module.exports = router