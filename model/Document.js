const mongoose  = require("mongoose")

const DocumentSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    filePath:{
        type:String,
        // required:true
    },
    employee :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Document', DocumentSchema)