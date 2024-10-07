const mongoose = require("mongoose");

const subscribeContactsSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:['Subscribed','Unsubscribed'],
        default:'Subscribed'
    }
})

module.exports=mongoose.model('SubscribeContacts',subscribeContactsSchema)