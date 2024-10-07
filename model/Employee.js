const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required : true
  },
  lastName: {
    type: String,
    // required : true
  },
  email: {
    type: String,
    unique: true,
    // required : true
  },
  phone: {
    type: String,
    // required : true
  },
  department: {
    type: String,
    // required : true
  },
  position: {
    type: String,
    // required : true
  },
  salary: {
    type: Number,
    // required : true
  },
  password: {
    type: String,
    // required : true
  },
  role: {
    type: String,
    // required : true
  },
  joinedDate: {
    type: Date,
    default : Date.now
  },
  employeeID: {
    type: String,
    // required : true
  },
  officialEmail: {
    type: String,
    // required : true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    // required : true
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
