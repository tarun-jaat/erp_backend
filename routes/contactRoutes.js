const { createContact, getAllContacts, getAllLeads, createLead, updateLead } = require("../controllers/contactController");
const express = require("express");
const { createQuotation, updateQuotation, getQuotation } = require("../controllers/quataionController");
const { createTask, getTasks } = require('../controllers/TaskController');

const router = express.Router();

router.post("/createContact", createContact);
router.get('/getContact',getAllContacts)

router.get('/getLeads',getAllLeads)
router.post('/createLead',createLead)
// routed.post('/updateLead',updateLead)


router.post("/quotations",createQuotation); 
router.get("/quotations/:id",getQuotation );
router.patch('/quotations/:id', updateQuotation);

router.post('/createTask', createTask);
router.get('/getTask',getTasks)


module.exports = router;
