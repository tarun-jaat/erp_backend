const mongoose = require("mongoose");

const OrgChartSchema = new mongoose.Schema({
    employee:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
        // required: true
    },
    manager:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    department:{
        type : String,
        // required : true
    },
    position:{
        type : String,
        // required : true
    },
})

module.exports = mongoose.model('OrgChart', OrgChartSchema);