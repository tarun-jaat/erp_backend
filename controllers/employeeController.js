const Employee = require("../model/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.createEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    department,
    salary,
    phone,
    position,
    employeeID,
    joinedDate,
    officialEmail,
    gender
  } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let employee = await Employee.findOne({ email });
    if (employee) {
      console.log("Employee already exists:", employee);
      return res.status(400).json({ message: "Employee already exists" });
    }

    let generatedPassword = password;
    if (!generatedPassword) {
      generatedPassword = crypto.randomBytes(8).toString("hex");
    }

    employee = new Employee({
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      salary,
      password: generatedPassword,
      role,
      employeeID,
      joinedDate,
      officialEmail,
      gender
    });

    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(generatedPassword, salt);

    await employee.save();

    res.status(201).json({ message: "Employee created successfully", employeeId: employee.id, generatedPassword });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password"); // Retrieve all employees without password
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, phone, department, position, salary } = req.body;
  try {
    let employee = await Employee.findById(req.params.id); // Use req.params.id to update specific employee
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        phone,
        department,
        position,
        salary,
      },
      {
        new: true,
      }
    );

    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id); // Use req.params.id to delete specific employee
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    await employee.remove();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
